import React, { useContext } from 'react';
import { store } from '../../reducer/store';

function BoardgamesList() {
  const { state } = useContext(store);
  const boardgames = state.scoreboard.boardgames;

  return (
    <div style={{ padding: 16 }}>
      <h2>Boardgame List</h2>
      <input
        style={{
          width: '50%',
          backgroundColor: 'lightgrey',
          borderRadius: 100,
          borderStyle: 'none',
          marginTop: 16,
          marginBottom: 24,
          padding: 16,
        }}
        placeholder={'Search...'}
      />
      <div>
        <div style={{ padding: 16, display: 'flex', justifyContent: 'space-around' }}>
          <h4 style={{ flex: 1, textAlign: 'center' }}>Name</h4>
          <h4 style={{ flex: 1, textAlign: 'center' }}>Expansions Owned</h4>
          <h4 style={{ flex: 1, textAlign: 'center' }}>Games Played</h4>
          <h4 style={{ flex: 1, textAlign: 'center' }}>Last Played</h4>
        </div>
        <div>
          {boardgames.map((boardgame) => {
            const { name, expansionsOwned } = boardgame;
            return (
              <div
                key={boardgame.name}
                style={{
                  height: 50,
                  borderRadius: 5,
                  boxShadow: '0 0 16px rgba(0,0,0,0.2)',
                  margin: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <p style={{ flex: 1, textAlign: 'center' }}>{name}</p>
                <p style={{ flex: 1, textAlign: 'center' }}>{expansionsOwned?.length || 0}</p>
                <p style={{ flex: 1, textAlign: 'center' }}>TODO: Games Played</p>
                <p style={{ flex: 1, textAlign: 'center' }}>TODO: Last Played</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BoardgamesList;
