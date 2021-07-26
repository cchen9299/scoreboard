import React, { useContext } from 'react';
import { store } from '../../reducer/store';
import BoardgameForm from './components/BoardgameForm';

function RecordGame() {
  const { state } = useContext(store);
  const { boardgames, players } = state.scoreboard;

  return (
    <div style={{ padding: 16 }}>
      <h2>Record Game</h2>
      <form style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <h3>Boardgame</h3>
        <BoardgameForm boardgames={boardgames} />
        <h3>Player</h3>
      </form>
    </div>
  );
}

export default RecordGame;
