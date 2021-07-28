import GameRecordsDAO from '../dao/gameRecordsDAO.js';

export default class GameRecordsController {
  static async apiGetGameRecords(req, res, next) {
    const gameRecordsPerPage = req.query.gameRecordsPerPage
      ? parseInt(req.query.gameRecordsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.boardgamePlayed) {
      filters.boardgamePlayed = req.query.boardgamePlayed;
    }

    const { gameRecordsList, totalNumGameRecords } = await GameRecordsDAO.getGameRecords({
      filters,
      page,
      gameRecordsPerPage,
    });

    let response = {
      gameRecords: gameRecordsList,
      page: page,
      filters: filters,
      entries_per_page: gameRecordsPerPage,
      total_results: totalNumGameRecords,
    };
    res.json(response);
  }

  static async apiPostGameRecord(req, res, next) {
    try {
      const boardgamePlayed = req.body.boardgamePlayed;
      const expansionsPlayed = req.body.expansionsPlayed;
      const gameDuration = req.body.gameDuration;
      const players = req.body.players; //[...{firstName, lastName, score, _id}]
      const date = new Date();
      const boardgame_id = req.body.boardgame_id;

      const gameRecordResponse = await GameRecordsDAO.addGameRecord(
        boardgamePlayed,
        expansionsPlayed,
        gameDuration,
        players,
        date,
        boardgame_id
      );
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // static async apiUpdateBoardgameName(req, res, next) {
  //   try {
  //     const boardgameId = req.body.boardgame_id;
  //     const name = req.body.name;

  //     //TODO: Update Boardgame Expansions

  //     const boardgameResponse = await GameRecordsDAO.updateBoardgameName(boardgameId, name);

  //     var { error } = boardgameResponse;
  //     if (error) {
  //       res.status(400).json({ error });
  //     }

  //     res.json({ status: 'success' });
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // }
}
