import ACTIONS from './actions';

export const getBoardgames = (dispatch) => {
  dispatch({
    type: ACTIONS.FETCH_DATA,
    payload: {},
  });
  fetch('http://localhost:5000/api/v1/scoreboard/boardgames')
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: {
          boardgames: data.boardgames,
        },
      });
    });
};

export const getPlayers = (dispatch) => {
  dispatch({
    type: ACTIONS.FETCH_DATA,
    payload: {},
  });
  fetch('http://localhost:5000/api/v1/scoreboard/players')
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: {
          players: data.players,
        },
      });
    });
};

export const getGameRecords = (dispatch) => {
  dispatch({
    type: ACTIONS.FETCH_DATA,
    payload: {},
  });
  fetch('http://localhost:5000/api/v1/scoreboard/gameRecords')
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: {
          gameRecords: data.gameRecords,
        },
      });
    });
};

export const getData = (dispatch, collectionName) => {
  dispatch({
    type: ACTIONS.FETCH_DATA,
    payload: {},
  });
  fetch(`http://localhost:5000/api/v1/scoreboard/${collectionName}`)
    .then((res) => res.json())
    .then((data) => {
      const getPayload = () => {
        switch (collectionName) {
          case 'boardgames':
            return {
              boardgames: data.boardgames,
            };
          case 'players':
            return {
              players: data.players,
            };
          case 'gameRecords':
            return {
              gameRecords: data.gameRecords,
            };
          default:
            return {};
        }
      };
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: getPayload(),
      });
    });
};
