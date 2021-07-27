import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import AddPlayerFields from './AddPlayerFields';
import { capitalizeSingleWord } from '../../../util/helper';

export default function PlayersForm({ globalPlayersList, getPlayersData }) {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showPlayerSearchResults, setShowPlayerSearchResults] = useState(false);
  const [newPlayers, setNewPlayers] = useState([]);

  const handlePlayerSearchOnChange = (e) => {
    setShowPlayerSearchResults(true);
    setFilteredPlayers(
      globalPlayersList.filter((player) => {
        return player.firstName.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  const handleOnBlur = () => {
    document.addEventListener('click', (documentEvent) => {
      documentEvent.target.parentElement.id !== 'searchResultsList' &&
        setShowPlayerSearchResults(false);
    });
  };

  const handleResultOnClick = (player) => {
    const list = [...players];
    list.includes(player) === false && list.push(player);
    setPlayers(list);
    setShowPlayerSearchResults(false);
    getPlayersData([...list, newPlayers]);
  };

  const handleSelectedPlayerChange = (index, type, key, value) => {
    const list = [...players];
    type === 'delete' ? list.splice(index, 1) : (list[index][key] = capitalizeSingleWord(value));
    setPlayers(list);
    getPlayersData([...list, newPlayers]);
  };

  return (
    <div>
      <SearchContainer>
        <ListSearchInput
          placeholder={'Search players...'}
          onChange={handlePlayerSearchOnChange}
          onBlurCapture={handleOnBlur}
          id={'searchResultsList'}
        />
        {showPlayerSearchResults && (
          <SearchResultsList id={'searchResultsList'}>
            {filteredPlayers.map((player) => {
              return (
                <Result key={player._id} onClick={() => handleResultOnClick(player)}>
                  {player.firstName} {player.lastName}
                </Result>
              );
            })}
          </SearchResultsList>
        )}
      </SearchContainer>
      <div>
        {players?.map((player, index) => {
          return (
            <div key={player._id} style={{ display: 'flex', marginTop: 8 }}>
              <SelectedPlayer
                style={{ marginRight: 8 }}
                value={player.firstName + ' ' + player.lastName}
                disabled
              />

              <Input
                placeholder="Score"
                type="number"
                onChange={(e) => {
                  handleSelectedPlayerChange(index, 'update', 'score', e.target.value);
                }}
              />
              <Delete
                children={'Delete'}
                onClick={() => {
                  handleSelectedPlayerChange(index, 'delete');
                }}
              />
            </div>
          );
        })}
      </div>
      <AddPlayerFields
        parentCallback={(childrenData) => {
          setNewPlayers(childrenData);
          getPlayersData([...players, ...childrenData]);
        }}
      />
    </div>
  );
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

const SelectedPlayer = styled.input`
  padding: 8px;
  flex: 1;
  border: solid 2px lightgrey;
  border-radius: 5px;
  background-color: lightgrey;
`;

const Delete = styled.div`
  cursor: pointer;
  padding: 8px;
`;

const Input = styled.input`
  outline: none;
  border-radius: 5px;
  border: solid 2px grey;
  padding: 8px;
  flex: 1;
`;
