import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { capitalizeSingleWord } from '../../../util/helper';

export default function PlayersForm({ globalPlayersList, getPlayersData }) {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showPlayerSearchResults, setShowPlayerSearchResults] = useState(false);

  const [players, setPlayers] = useState([]);

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
      documentEvent.target.parentElement?.id !== 'searchResultsList' &&
        setShowPlayerSearchResults(false);
    });
  };

  const handleResultOnClick = (player) => {
    const list = [...players];
    list.includes(player) === false && list.push(player);
    setPlayers(list);
    setShowPlayerSearchResults(false);
    getPlayersData([...list]);
  };

  const handleSelectedPlayerChange = (index, type, key, value) => {
    const list = [...players];
    type === 'delete' ? list.splice(index, 1) : (list[index][key] = capitalizeSingleWord(value));
    setPlayers(list);
    getPlayersData([...list]);
  };

  return (
    <div>
      <SearchContainer>
        <Flex style={{ alignItems: 'center' }}>
          <div style={{ padding: '0 0 0 12px' }}>
            <SearchIcon />
          </div>
          <ListSearchInput
            placeholder={'Search players...'}
            onChange={handlePlayerSearchOnChange}
            onBlurCapture={handleOnBlur}
            id={'searchResultsList'}
          />
        </Flex>
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
              <IconButton
                icon={<SmallCloseIcon />}
                children={'Delete'}
                onClick={() => {
                  handleSelectedPlayerChange(index, 'delete');
                }}
              />
            </div>
          );
        })}
      </div>
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
  flex-grow: 1;
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
