import React, { createContext, useReducer } from 'react';
import ACTIONS from './actions/actions';

const initialState = { isLoading: false, boardgames: {} };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTIONS.GET_BOARDGAMES:
        return {
          ...state,
          isLoading: action.isLoading,
          boardgames: action.payload,
        };
      case ACTIONS.SUCCESS:
        return {
          ...state,
          isLoading: action.isLoading,
          boardgames: action.payload,
        };
      case ACTIONS.ERROR:
        return {
          ...state,
          isLoading: action.isLoading,
          boardgames: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
