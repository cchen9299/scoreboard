import React, { useContext, useState } from 'react';
import { postData } from '../../actions';
import { store } from '../../reducer/store';
import BoardgameForm from './components/BoardgameForm';
import PlayersForm from './components/PlayersForm';
import { Button, Spinner } from '@chakra-ui/react';

function RecordGame() {
  const { state, dispatch } = useContext(store);
  const { boardgames, players } = state.scoreboard;
  const globalPlayersList = [...players];

  const showDataDoubleCheck = false;

  const [gameRecordBoardgameData, setGameRecordBoardgameData] = useState(null);
  const [gameRecordPlayersData, setGameRecordPlayersData] = useState(null);
  const [inputError, setInputError] = useState();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (gameRecordBoardgameData === null || gameRecordPlayersData === null) {
      setInputError('field required');
      return;
    }

    // const boardgameData = {
    //   name: gameRecordBoardgameData.boardgame?.name,
    //   expansionsOwned: [
    //     ...gameRecordBoardgameData.expansionsPlayed,
    //     ...gameRecordBoardgameData.newExpansionsPlayed,
    //   ],
    // };
    // postData(dispatch, 'boardgames', boardgameData);

    const playersData = gameRecordPlayersData.map((player) => {
      return {
        firstName: player.firstName,
        lastName: player.lastName,
        score: player.score,
        player_id: player._id,
      };
    });

    const gameRecord = {
      boardgamePlayed: gameRecordBoardgameData.boardgame,
      expansionsPlayed: [
        ...gameRecordBoardgameData.expansionsPlayed,
        ...gameRecordBoardgameData.newExpansionsPlayed,
      ],
      players: playersData,
    };

    postData(dispatch, 'gameRecords', gameRecord);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Record Game</h2>
      <form
        name={'gameRecordForm'}
        onSubmit={(event) => {
          handleOnSubmit(event);
        }}
        style={{ display: 'flex', flexDirection: 'column', width: '50%' }}
      >
        <h3>Boardgame</h3>
        <BoardgameForm
          inputError={inputError}
          boardgames={boardgames}
          getBoardgameData={(data) => {
            setGameRecordBoardgameData(data);
          }}
        />
        <h3>Players</h3>
        <PlayersForm
          inputError={inputError}
          globalPlayersList={globalPlayersList}
          getPlayersData={(data) => {
            setGameRecordPlayersData(data);
          }}
        />
        <br />
        <Button type="submit" disabled={state.isLoading}>
          {state.isLoading ? <Spinner /> : 'Off to the data base you go'}
        </Button>
      </form>
      {showDataDoubleCheck && (
        <div style={{ minHeight: 100 }}>
          <br />
          <br />
          <h3>Double Check My Data...</h3>
          <br />
          <div>
            {gameRecordBoardgameData?.boardgame.name}
            {gameRecordBoardgameData?.boardgame._id}
            {gameRecordBoardgameData?.newBoardgame?.name}
            {gameRecordBoardgameData?.expansionsPlayed?.map((expansion) => {
              return <div key={expansion}>{expansion}</div>;
            })}
            {gameRecordBoardgameData?.newExpansionsPlayed?.map((expansion) => {
              return <div key={expansion}>{expansion}</div>;
            })}
          </div>
          {gameRecordPlayersData?.map((player, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                {player.firstName} {player.lastName} {player.score} {player._id}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecordGame;
