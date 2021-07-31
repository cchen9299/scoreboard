import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let gameRecords;

export default class GameRecordsDAO {
  static async injectDB(conn) {
    if (gameRecords) {
      return;
    }
    try {
      gameRecords = await conn.db(process.env.SCOREBOARD_NS).collection('gameRecords');
    } catch (e) {
      console.error(`Unable to establish a collection handle in gameRecordsDAO: ${e}`);
    }
  }

  static async getGameRecords({ filters = null, page = 0, gameRecordsPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ('boardgamePlayed' in filters) {
        query = { $test: { $search: filters['boardgamePlayed'] } };
      }
    }
    let cursor;
    try {
      cursor = await gameRecords.find(query);
    } catch (e) {
      console.log(`Unable to issue find command, ${e}`);
    }

    const displayCursor = cursor.limit(gameRecordsPerPage).skip(gameRecordsPerPage * page);

    try {
      const gameRecordsList = await displayCursor.toArray();
      const totalNumGameRecords = page === 0 ? await gameRecords.countDocuments(query) : 0;

      return { gameRecordsList, totalNumGameRecords };
    } catch (e) {
      console.log(`Unable to convert cursor to array or problem counting documents, ${e}`);
    }

    return { gameRecordsList: [], totalNumGameRecords: 0 };
  }

  static async addGameRecord(
    boardgamePlayed,
    expansionsPlayed = [],
    gameDuration,
    players = [],
    date,
    boardgame_id
  ) {
    try {
      const gameRecordDoc = {
        boardgamePlayed: boardgamePlayed,
        boardgame_id: ObjectId(boardgame_id),
        expansionsPlayed: expansionsPlayed,
        gameDuration: gameDuration,
        players: players,
        date: date,
      };

      return await gameRecords.insertOne(gameRecordDoc);
    } catch (e) {
      console.error(`Unable to post game record: ${e}`);
      return { error: e };
    }
  }

  //TODO: Update Players Played, Score && Create New Player If Not Found
  //TODO: Update expansions played

  // static async updateBoardgameName(boardgameId, name) {
  //   try {
  //     const updateResponse = await gameRecords.updateOne(
  //       { _id: ObjectId(boardgameId) },
  //       { $set: { name: name } }
  //     );

  //     return updateResponse;
  //   } catch (e) {
  //     console.error(`Unable to update boardgame: ${e}`);
  //     return { error: e };
  //   }
  // }
}
