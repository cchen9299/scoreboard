import React, { useContext, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { store } from './reducer/store';
import { getData } from './actions';

import BoardgamesList from './components/BoardgamesList';
import RecordGame from './components/RecordGame';
import PlayersList from './components/PlayersList';
import PlayerDetails from './components/PlayerDetails';

function App() {
  const { dispatch } = useContext(store);

  useEffect(() => {
    getData(dispatch, 'boardgames');
    getData(dispatch, 'gameRecords');
    getData(dispatch, 'players');
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{ backgroundColor: 'skyblue', width: '200px', padding: 16 }}>
        <div>
          <li style={{}}>
            <Link
              to={'/recordGame'}
              style={{
                padding: 8,
                backgroundColor: 'white',
                borderRadius: 100,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'steelblue',
                fontSize: 19,
              }}
            >
              <p>Add Shit</p>
            </Link>
          </li>
          <li>
            <Link
              style={{
                marginTop: 25,
                padding: 8,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              to={'/'}
            >
              Boardgame List
            </Link>
          </li>
          <li>
            <Link
              style={{
                padding: 8,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              to={'/playersList'}
            >
              Players List
            </Link>
          </li>
        </div>
      </nav>

      <div style={{ flex: 1 }}>
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
