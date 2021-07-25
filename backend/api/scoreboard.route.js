import express from 'express';
import BoardgamesController from './boardgames.controller.js';
import GameRecordsController from './gameRecords.controller.js';
import PlayersController from './players.controllers.js';

const router = express.Router();

router
  .route('/boardgames')
  .get(BoardgamesController.apiGetBoardgames)
  .post(BoardgamesController.apiPostBoardgame)
  .put(BoardgamesController.apiUpdateBoardgameName);

router.route('/boardgames/id/:id').get(BoardgamesController.apiGetBoardgameById);

router
  .route('/gameRecords')
  .get(GameRecordsController.apiGetGameRecords)
  .post(GameRecordsController.apiPostGameRecord);

router.route('/players').get(PlayersController.apiGetPlayers).post(PlayersController.apiPostPlayer);

export default router;
