import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from '../../reducer/store';

function BoardgamesList() {
  const { state } = useContext(store);
  const boardgames = state.scoreboard.boardgames;

  return (
    <div style={{ padding: 16 }}>
      <h2>Boardgame List</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchInput placeholder={'Search...'} />
        <div>Add Button</div>
      </div>
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
              <RowItem key={boardgame.name}>
                <p style={{ flex: 1, textAlign: 'center' }}>{name}</p>
                <p style={{ flex: 1, textAlign: 'center' }}>{expansionsOwned?.length || 0}</p>
                <p style={{ flex: 1, textAlign: 'center' }}>TODO: Games Played</p>
                <p style={{ flex: 1, textAlign: 'center' }}>TODO: Last Played</p>
              </RowItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BoardgamesList;

const SearchInput = styled.input`
  width: 50%;
  background-color: lightgrey;
  border-radius: 100px;
  border-style: none;
  margin-top: 16px;
  margin-bottom: 24px;
  padding: 16px;
`;

const RowItem = styled.div`
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
