import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { store } from '../../reducer/store';
import {
  Button,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import AddPlayerFields from '../../components/AddPlayerFields';
import { postData } from '../../actions';

function PlayersList() {
  const { state, dispatch } = useContext(store);
  const players = state.scoreboard.players;
  const gameRecords = state.scoreboard.gameRecords;

  const [focusedPlayer, setFocusedPlayer] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newPlayers, setNewPlayers] = useState(null);

  const handleSubmit = () => {
    if (newPlayers === null) {
      return;
    }
    const data = [...newPlayers];
    postData(dispatch, 'players', data);
    onClose();
  };

  const handlePlayerFocus = (player) => {
    setFocusedPlayer(player);
  };

  const handleNewPlayers = (players) => {
    setNewPlayers([...players]);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Players List</h2>
      <Flex>
        <Input placeholder={'Search players...'} />
        <Button onClick={onOpen}>Add Player</Button>
      </Flex>
      <div>
        <div style={{ padding: 16, display: 'flex', justifyContent: 'space-around' }}>
          <h4 style={{ flex: 1, textAlign: 'center' }}>First Name</h4>
          <h4 style={{ flex: 1, textAlign: 'center' }}>Last Name</h4>
          <h4 style={{ flex: 1, textAlign: 'center' }}>Games Played</h4>
        </div>
        <div>
          {players?.map((player, index) => {
            const { firstName, lastName, _id } = player;
            const playerGames = gameRecords.filter((gameRecord) => {
              return gameRecord.players.every((player) => {
                return player.player_id === _id;
              });
            });
            return (
              <RowItem key={index} onClick={() => handlePlayerFocus(player)}>
                <p style={{ flex: 1, textAlign: 'center' }}>{firstName}</p>
                <p style={{ flex: 1, textAlign: 'center' }}>{lastName}</p>
                <p style={{ flex: 1, textAlign: 'center' }}>{playerGames.length}</p>
              </RowItem>
            );
          })}
        </div>
      </div>
      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Add Boardgame</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddPlayerFields parentCallback={handleNewPlayers} />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" onClick={handleSubmit}>
                Add Players
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PlayersList;

const RowItem = styled.div`
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
