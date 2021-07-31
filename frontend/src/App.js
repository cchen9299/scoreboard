import React, { useContext, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { store } from './reducer/store';
import { getData } from './actions';

import BoardgamesList from './screens/BoardgamesList';
import RecordGame from './screens/RecordGame';
import PlayersList from './screens/PlayersList';
import PlayerDetails from './screens/PlayerDetails';
import styled from 'styled-components';

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
          <Button to={'/recordGame'}>
            <p style={{ color: 'steelblue' }}>Record Game</p>
          </Button>
          <li>
            <NavLink style={{ marginTop: 25 }} to={'/'}>
              Boardgame List
            </NavLink>
          </li>
          <li>
            <NavLink to={'/playersList'}>Players List</NavLink>
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

const Button = styled(Link)`
  background-color: white;
  border-radius: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: steelblue;
  font-size: 19px;
  border-style: none;
  width: 100%;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  padding: 8px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
