import ACTIONS from './actions';

export const getBoardgames = (dispatch) => {
  dispatch({
    type: ACTIONS.GET_BOARDGAMES,
    payload: {},
    isLoading: true,
  });
  fetch('http://localhost:5000/api/v1/scoreboard/boardgames')
    .then((res) => res.json())
    .then((data) => {
      const boardgames = data;
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: boardgames,
        isLoading: false,
      });
    });
};
