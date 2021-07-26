import React, { useContext, useEffect } from 'react';
import { store } from './store';
import { Switch, Route, Link } from 'react-router-dom';
import BoardgamesList from './components/boardgamesList.screen';
import RecordGame from './components/recordGame';
import PlayersList from './components/playersList.screen';
import PlayerDetails from './components/playerDetails';
import { getBoardgames, getGameRecords, getPlayers } from './actions';

function App() {
  const { dispatch } = useContext(store);

  useEffect(() => {
    getBoardgames(dispatch);
    getGameRecords(dispatch);
    getPlayers(dispatch);
  }, [dispatch]);

  return (
    <div>
      <nav style={{}}>
        <div>
          <li>
            <Link to={'/'} className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to={'/recordGame'} className="nav-link">
              Record Game
            </Link>
          </li>
          <li>
            <Link to={'/playersList'} className="nav-link">
              Players List
            </Link>
          </li>
        </div>
      </nav>

      <div>
        <Switch>
          <Route exact path={'/'} component={BoardgamesList} />
          <Route exact path={'/recordGame'} component={RecordGame} />
          <Route exact path={'/playersList'} component={PlayersList} />
          <Route exact path={'/playersList/:id/playerDetails'} component={PlayerDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
