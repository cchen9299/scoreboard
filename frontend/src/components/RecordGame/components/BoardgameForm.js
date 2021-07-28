import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddExpansionField from './AddExpansionField';

export default function BoardgameForm({ boardgames, getBoardgameData }) {
  const [filteredBoardgames, setFilteredBoardgames] = useState([]);
  const [showBoardgameSearchResults, setShowBoardgameSearchResults] = useState(false);
  const [showAddNewGameMenu, setShowAddNewGameMenu] = useState(false);

  const [selectedBoardgame, setSelectedBoardgame] = useState(null);
  const [newBoardgame, setNewBoardgame] = useState(null);

  const [expansionsChecked, setExpansionsChecked] = useState([]);
  const [newExpansions, setNewExpansions] = useState([]);

  const handleBoardgameSearchOnChange = (e) => {
    setShowBoardgameSearchResults(true);
    setFilteredBoardgames(
      boardgames.filter((boardgame) => {
        return boardgame.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  const handleResultOnClick = (item) => {
    setSelectedBoardgame(item);
    getBoardgameData({
      boardgame: item,
      expansionsPlayed: [...expansionsChecked, ...newExpansions],
    });
  };

  const handleNewBoardgameAdd = (e) => {
    const item = { name: e.target.value };
    setNewBoardgame(item);
    getBoardgameData({
      boardgame: item,
      expansionsPlayed: [...expansionsChecked, ...newExpansions],
    });
  };

  const handleBoardgameDelete = () => {
    setSelectedBoardgame(null);
    setNewBoardgame(null);
    setExpansionsChecked([]);
    getBoardgameData({
      boardgame: null,
      expansionsPlayed: null,
    });
  };

  const handleNewExpansions = (newExpansions) => {
    const list = [...newExpansions];
    setNewExpansions([...newExpansions]);
    getBoardgameData({
      boardgame: selectedBoardgame || newBoardgame,
      expansionsPlayed: [...expansionsChecked, list],
    });
  };

  const handleExpansionChecked = (e) => {
    const list = [...expansionsChecked];
    const value = e.target.value;
    const valueIndex = list.indexOf(value);
    list.includes(e.target.value) ? list.splice(valueIndex, 1) : list.push(e.target.value);
    setExpansionsChecked(list);
    getBoardgameData({
      boardgame: selectedBoardgame || newBoardgame,
      expansionsPlayed: [list, ...newExpansions],
    });
  };

  if (selectedBoardgame) {
    return (
      <div>
        <SelectedBoardgameContainer>
          <SelectedBoardgame value={selectedBoardgame.name} disabled />
          <Delete
            onClick={() => {
              setSelectedBoardgame(null);
              setShowBoardgameSearchResults(false);
              handleBoardgameDelete();
            }}
            children={'Delete'}
          />
        </SelectedBoardgameContainer>
        {selectedBoardgame.expansionsOwned && <label>Expansions Played</label>}
        {selectedBoardgame.expansionsOwned?.map((expansion, index) => {
          return (
            <div key={expansion} style={{ display: 'flex' }}>
              <input
                id={`expansion${index}`}
                type="checkbox"
                value={expansion}
                onChange={handleExpansionChecked}
              />
              <label htmlFor={`expansion${index}`}>{expansion}</label>
            </div>
          );
        })}
        <AddExpansionField parentCallback={handleNewExpansions} />
      </div>
    );
  } else if (showAddNewGameMenu) {
    return (
      <div>
        <div style={{ display: 'flex', marginTop: 8 }}>
          <Input placeholder={'Boardgame Name...'} onChange={handleNewBoardgameAdd} />
          <Delete
            onClick={() => {
              setShowAddNewGameMenu(false);
              setShowBoardgameSearchResults(false);
              handleBoardgameDelete();
            }}
            children={'Delete'}
          />
        </div>
        <AddExpansionField parentCallback={handleNewExpansions} />
      </div>
    );
  } else {
    return (
      <div>
        <SearchContainer>
          <ListSearchInput
            placeholder={'Search boardgames...'}
            onChange={(e) => handleBoardgameSearchOnChange(e)}
            onBlur={() => {
              selectedBoardgame && setShowBoardgameSearchResults(false);
            }}
          />
          {showBoardgameSearchResults && (
            <SearchResultsList>
              {filteredBoardgames.map((boardgame) => {
                return (
                  <Result key={boardgame.name} onClick={() => handleResultOnClick(boardgame)}>
                    {boardgame.name}
                  </Result>
                );
              })}
            </SearchResultsList>
          )}
        </SearchContainer>
        <AddButton onClick={() => setShowAddNewGameMenu(true)}>New Boardgame</AddButton>
      </div>
    );
  }
}
const SearchContainer = styled.div`
  border: solid 2px grey;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-top: 8px;
`;
const ListSearchInput = styled.input`
  padding: 8px;
  border: 0;
  outline: none;
  border-radius: 5px;
`;
const SearchResultsList = styled.div`
  z-index: 10;
  background-color: white;
  width: 100%;
`;

const Result = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    background-color: lightgrey;
  }
`;

const SelectedBoardgameContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const SelectedBoardgame = styled.input`
  padding: 8px;
  flex: 1;
  border: solid 2px lightgrey;
  background-color: lightgrey;
  border-radius: 5px;
`;

const Delete = styled.div`
  cursor: pointer;
  padding: 8px;
`;

const AddButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
  color: steelblue;
`;

const Input = styled.input`
  outline: none;
  border-radius: 5px;
  border: solid 2px grey;
  padding: 8px;
  flex: 1;
`;
