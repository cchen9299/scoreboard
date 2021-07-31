import React, { useContext, useState } from 'react';
import { getData, postData } from '../../actions';
import { store } from '../../reducer/store';
import BoardgameForm from './components/BoardgameForm';
import PlayersForm from './components/PlayersForm';

function RecordGame() {
  const { state, dispatch } = useContext(store);
  const { boardgames, players } = state.scoreboard;
  const globalPlayersList = [...players];

  const [showData, setShowData] = useState(true);

  const [gameRecordBoardgameData, setGameRecordBoardgameData] = useState({});
  const [gameRecordPlayersData, setGameRecordPlayersData] = useState([]);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    // const boardgameData = {
    //   name: gameRecordBoardgameData.boardgame?.name,
    //   expansionsOwned: [
    //     ...gameRecordBoardgameData.expansionsPlayed,
    //     ...gameRecordBoardgameData.newExpansionsPlayed,
    //   ],
    // };
    // postData(dispatch, 'boardgames', boardgameData);

    // const playersData = gameRecordPlayersData.map((player) => {
    //   return { firstName: player.firstName, lastName: player.lastName, player_id: };
    // });
    // postData(dispatch, 'players', playersData);

    // const gameRecord = {
    //   boardgamePlayed: gameRecordBoardgameData.boardgame,
    //   expansionsPlayed: [
    //     ...gameRecordBoardgameData.expansionsPlayed,
    //     ...gameRecordBoardgameData.newExpansionsPlayed,
    //   ],
    //   players: playersData,
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
          {gameRecordPlayersData?.map((player, index) => {
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
