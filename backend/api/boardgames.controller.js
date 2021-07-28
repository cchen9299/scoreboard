import BoardgamesDAO from '../dao/boardgamesDAO.js';

export default class BoardgamesController {
  static async apiGetBoardgames(req, res, next) {
    const boardgamesPerPage = req.query.boardgamesPerPage
      ? parseInt(req.query.boardgamesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }

    const { boardgamesList, totalNumBoardgames } = await BoardgamesDAO.getBoardgames({
      filters,
      page,
      boardgamesPerPage,
    });

    let response = {
      boardgames: boardgamesList,
      page: page,
      filters: filters,
      entries_per_page: boardgamesPerPage,
      total_results: totalNumBoardgames,
    };
    res.json(response);
  }

  static async apiPostBoardgame(req, res, next) {
    try {
      const name = req.body.name;
      const expansionsOwned = req.body.expansionsOwned;

      const boardgameResponse = await BoardgamesDAO.addBoardgame(name, expansionsOwned);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateBoardgameName(req, res, next) {
    try {
      const boardgameId = req.body.boardgame_id;
      const name = req.body.name;

      //TODO: Update Boardgame Expansions

      const boardgameResponse = await BoardgamesDAO.updateBoardgameName(boardgameId, name);

      var { error } = boardgameResponse;
      if (error) {
        res.status(400).json({ error });
      }

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetBoardgameById(req, res, next) {
    try {
      let id = req.params.id || {};
      let boardgame = await BoardgamesDAO.getBoardgameById(id);
      if (!boardgame) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(boardgame);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  //query after a ?
  //param after a /
}
