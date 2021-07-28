import React, { useContext, useReducer, useState } from 'react';
import { getData, getLiveData, postData } from '../../actions';
import { store } from '../../reducer/store';
import BoardgameForm from './components/BoardgameForm';
import PlayersForm from './components/PlayersForm';

const gameRecordReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function RecordGame() {
  const { state, dispatch } = useContext(store);
  const { boardgames, players } = state.scoreboard;
  const globalPlayersList = [...players];

  const [formData, setFormData] = useReducer(gameRecordReducer, {});

  const [showData, setShowData] = useState(true);

  const [gameRecordBoardgameData, setGameRecordBoardgameData] = useState({});
  const [gameRecordPlayersData, setGameRecordPlayersData] = useState([]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    //need to create new boardgame and new players record in mongoldb
    //then reshape the boardgame player state data using the new records with id
    //then submit game record

    const boardgameData = {
      name: gameRecordBoardgameData.boardgame?.name,
      expansionsOwned: [
        ...gameRecordBoardgameData.expansionsPlayed,
        ...gameRecordBoardgameData.newExpansionsPlayed,
      ],
    };

    const playersData = gameRecordPlayersData.map((player) => {
      return { firstName: player.firstName, lastName: player.lastName };
    });

    postData(dispatch, 'boardgames', boardgameData);
    postData(dispatch, 'players', playersData);

    // const gameRecord = {
    //   boardgamePlayed: gameRecordBoardgameData.boardgame,
    //   expansionsPlayed: gameRecordBoardgameData.expansionsPlayed,
    //   players: gameRecordPlayersData,
    // };
  };

  const handleCheckDatabase = () => {
    getData(dispatch, 'players');
    console.log(state.scoreboard.players);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Record Game</h2>
      <form
        onSubmit={(event) => {
          handleOnSubmit(event);
          handleCheckDatabase();
        }}
        style={{ display: 'flex', flexDirection: 'column', width: '50%' }}
      >
        <h3>Boardgame</h3>
        <BoardgameForm
          boardgames={boardgames}
          getBoardgameData={(data) => {
            setGameRecordBoardgameData(data);
          }}
        />
        <h3>Players</h3>
        <PlayersForm
          globalPlayersList={globalPlayersList}
          getPlayersData={(data) => {
            setGameRecordPlayersData(data);
          }}
        />
        <br />
        <button type="submit">Off to the data base you go</button>
      </form>
      <button onClick={handleCheckDatabase}>Check Database</button>
      {showData && (
        <div style={{ minHeight: 100 }}>
          <br />
          <br />
          <h3>Double Check My Data...</h3>
          <br />
          <div>
            {gameRecordBoardgameData.boardgame?.name}
            {gameRecordBoardgameData.newBoardgame?.name}
            {gameRecordBoardgameData.expansionsPlayed?.map((expansion) => {
              return <div key={expansion}>{expansion}</div>;
            })}
          </div>
          {gameRecordPlayersData.players?.map((player, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <div>
                  {player.firstName} {player.lastName} {player.score}
                </div>
              </div>
            );
          })}
          {gameRecordPlayersData.newPlayers?.map((player, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <div>
                  {player.firstName} {player.lastName} {player.score}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecordGame;
