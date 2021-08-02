import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { store } from '../../reducer/store';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import AddExpansionField from '../../components/AddExpansionField';
import { postData } from '../../actions';

function BoardgamesList() {
  const { state, dispatch } = useContext(store);
  const [boardgames, setBoardgames] = useState([]);

  useEffect(() => {
    setBoardgames(state.scoreboard.boardgames);
  }, [state]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBoardgame, setNewBoardgame] = useState(null);
  const [newExpansions, setNewExpansions] = useState([]);

  const handleBoardgameSubmit = () => {
    const data = {
      name: newBoardgame.name,
      expansionsOwned: [...newExpansions],
    };
    postData(dispatch, 'boardgames', data);
    onClose();
  };

  const handleNewExpansions = (newExpansions) => {
    setNewExpansions([...newExpansions]);
  };

  const handleNewBoardgameName = (e) => {
    const item = { name: e.target.value };
    setNewBoardgame(item);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Boardgame List</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input placeholder={'Search...'} />
        <Button onClick={onOpen}>Add Boradgame</Button>
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
      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Boardgame</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Boardgame Name" onChange={(e) => handleNewBoardgameName(e)} />
            <AddExpansionField parentCallback={handleNewExpansions} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleBoardgameSubmit}>Add Boardgame</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default BoardgamesList;

const RowItem = styled.div`
  height: 50px;
  border-radius: 5px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
