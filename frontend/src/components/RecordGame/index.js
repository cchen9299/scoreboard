import React, { useCallback, useContext, useReducer, useState } from 'react';
import { store } from '../../reducer/store';
import BoardgameForm from './components/BoardgameForm';
import PlayersForm from './components/PlayersForm';

const gameRecordReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function RecordGame() {
  const { state } = useContext(store);
  const { boardgames, players } = state.scoreboard;
  const globalPlayersList = [...players];

  const [formData, setFormData] = useReducer(gameRecordReducer, {});

  const [showData, setShowData] = useState(true);

  const [gameRecordBoardgameData, setGameRecordBoardgameData] = useState({});
  const [gameRecordPlayersData, setGameRecordPlayersData] = useState([]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setShowData(true);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Record Game</h2>
      <form
        onSubmit={handleOnSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '50%' }}
      >
        <h3>Boardgame</h3>
        <BoardgameForm boardgames={boardgames} />
        <h3>Players</h3>
        <PlayersForm
          globalPlayersList={globalPlayersList}
          getPlayersData={(data) => {
            setGameRecordPlayersData(data);
          }}
        />
        <button type="submit">check value</button>
      </form>
      {showData && (
        <div style={{ minHeight: 100, backgroundColor: 'pink' }}>
          {gameRecordPlayersData?.map((player, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <div>{player.firstName}</div>
                <div>{player.lastName}</div>
                <div>{player.score}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecordGame;
