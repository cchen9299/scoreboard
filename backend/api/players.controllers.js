import PlayersDAO from '../dao/playersDAO.js';

export default class PlayersController {
  static async apiGetPlayers(req, res, next) {
    const playersPerPage = req.query.playersPerPage ? parseInt(req.query.playersPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { playersList, totalNumPlayers } = await PlayersDAO.getPlayers({
      filters,
      page,
      playersPerPage,
    });

    let response = {
      players: playersList,
      page: page,
      filters: filters,
      entries_per_page: playersPerPage,
      total_results: totalNumPlayers,
    };
    res.json(response);
  }

  static async apiPostPlayer(req, res, next) {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;

      const gameRecordResponse = await PlayersDAO.addPlayer(firstName, lastName);
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
