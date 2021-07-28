import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let boardgames;

export default class BoardgamesDAO {
  static async injectDB(conn) {
    if (boardgames) {
      return;
    }
    try {
      boardgames = await conn.db(process.env.SCOREBOARD_NS).collection('boardgames');
    } catch (e) {
      console.error(`Unable to establish a collection handle in boardgamesDAO: ${e}`);
    }
  }

  static async getBoardgames({ filters = null, page = 0, boardgamesPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $test: { $search: filters['name'] } };
      }
    }
    let cursor;
    try {
      cursor = await boardgames.find(query);
    } catch (e) {
      console.log(`Unable to issue find command, ${e}`);
    }

    const displayCursor = cursor.limit(boardgamesPerPage).skip(boardgamesPerPage * page);

    try {
      const boardgamesList = await displayCursor.toArray();
      const totalNumBoardgames = page === 0 ? await boardgames.countDocuments(query) : 0;

      return { boardgamesList, totalNumBoardgames };
    } catch (e) {
      console.log(`Unable to convert cursor to array or problem counting documents, ${e}`);
    }

    return { boardgamesList: [], totalNumBoardgames: 0 };
  }

  //TODO: respond error when duplicate expansions

  static async addBoardgame(name, expansionsOwned = []) {
    try {
      const boardgameDoc = {
        name: name,
        expansionsOwned: expansionsOwned,
      };
      return await boardgames.findOneAndUpdate(
        {
          name: name,
        },
        { $set: { name: name }, $addToSet: { expansionsOwned: { $each: [...expansionsOwned] } } },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    } catch (e) {
      console.error(`Unable to post boardgame: ${e}`);
      return { error: e };
    }
  }

  static async updateBoardgameName(boardgameId, name) {
    try {
      const updateResponse = await boardgames.updateOne(
        { _id: ObjectId(boardgameId) },
        { $set: { name: name } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update boardgame: ${e}`);
      return { error: e };
    }
  }

  static async getBoardgameById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'gameRecords',
            let: {
              id: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$boardgame_id', '$$id'],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: 'gameRecords',
          },
        },
        {
          $addFields: {
            gameRecords: '$gameRecords',
          },
        },
      ];
      return await boardgames.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getBoardgameByID: ${e}`);
      throw e;
    }
  }
}
