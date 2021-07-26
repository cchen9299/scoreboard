import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddInputField from './AddInputField';

export default function BoardgameForm({ boardgames }) {
  const [filteredBoardgames, setFilteredBoardgames] = useState([]);
  const [showBoardgameSearchResults, setShowBoardgameSearchResults] = useState(false);
  const [selectedBoardgame, setSelectedBoardgame] = useState(null);
  const [showAddGameMenu, setShowAddGameMenu] = useState(false);
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
  };

  useEffect(() => {
    setNewExpansions((prev) => prev);
  }, [newExpansions]);

  if (selectedBoardgame) {
    return (
      <div>
        <SelectedBoardgameContainer>
          <SelectedBoardgame>{selectedBoardgame.name}</SelectedBoardgame>
          <Delete
            onClick={() => {
              setSelectedBoardgame(null);
              setShowBoardgameSearchResults(false);
            }}
            children={'Delete'}
          />
        </SelectedBoardgameContainer>
        {selectedBoardgame.expansionsOwned && <label>Expansions Played</label>}
        {selectedBoardgame.expansionsOwned?.map((expansion, index) => {
          return (
            <div key={expansion} style={{ display: 'flex' }}>
              <input id={`expansion${index}`} type="checkbox" value={expansion} />
              <label htmlFor={`expansion${index}`}>{expansion}</label>
            </div>
          );
        })}
        <AddInputField
          parentCallback={(expansionsArray) => {
            setNewExpansions([...expansionsArray]);
          }}
        />
      </div>
    );
  } else if (showAddGameMenu) {
    return (
      <div>
        <div style={{ display: 'flex', marginTop: 8 }}>
          <Input placeholder={'Boardgame Name...'} />
          <Delete
            onClick={() => {
              setShowAddGameMenu(false);
              setShowBoardgameSearchResults(false);
              setNewExpansions([]);
            }}
            children={'Delete'}
          />
        </div>
        {newExpansions && <label>Expansions Played</label>}
        <AddInputField
          parentCallback={(expansionsArray) => {
            setNewExpansions([...expansionsArray]);
          }}
        />
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
        <AddButton onClick={() => setShowAddGameMenu(true)}>New Boardgame</AddButton>
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

const SelectedBoardgame = styled.div`
  padding: 8px;
  flex: 1;
  border: solid 2px grey;
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