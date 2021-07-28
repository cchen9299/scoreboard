import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let players;

export default class PlayersDAO {
  static async injectDB(conn) {
    if (players) {
      return;
    }
    try {
      players = await conn.db(process.env.SCOREBOARD_NS).collection('players');
    } catch (e) {
      console.error(`Unable to establish a collection handle in playersDAO: ${e}`);
    }
  }

  static async getPlayers({ filters = null, page = 0, playersPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $test: { $search: filters['name'] } };
      }
    }
    let cursor;
    try {
      cursor = await players.find(query);
    } catch (e) {
      console.log(`Unable to issue find command, ${e}`);
    }

    const displayCursor = cursor.limit(playersPerPage).skip(playersPerPage * page);

    try {
      const playersList = await displayCursor.toArray();
      const totalNumPlayers = page === 0 ? await players.countDocuments(query) : 0;

      return { playersList, totalNumPlayers };
    } catch (e) {
      console.log(`Unable to convert cursor to array or problem counting players documents, ${e}`);
    }

    return { playersList: [], totalNumPlayers: 0 };
  }

  static async addPlayer(playersArray) {
    try {
      const updateBulk = function (rec) {
        this.find(rec).upsert().updateOne({ $set: rec });
        return null;
      };
      const bulk = players.initializeUnorderedBulkOp();
      playersArray.map(updateBulk, bulk);
      await bulk.execute();
    } catch (e) {
      console.error(`Unable to post player: ${e}`);
      return { error: e };
    }
  }

  //TODO: Update Players

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
