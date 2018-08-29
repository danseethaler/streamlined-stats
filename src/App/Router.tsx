import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import {addGameAction} from '../redux/actions/games';
import {clearState, loadState} from '../redux/localStorage';
import Game from './pages/Game';
import {getUniqueId} from './services/unique_id';
import Games from './pages/Games';

const Router = ({games, history, addGame}) => {
  console.log('games', games);
  const {pathname} = history.location;
  console.log('history.location', history.location);

  return (
    <Switch>
      <Route path="/game/:id" component={Game} />
      <Route
        render={() => (
          <div>
            <Games />
            <button
              onClick={() => {
                const id = getUniqueId();
                addGame({id});
                history.push('/game/' + id);
              }}
            >
              New Game
            </button>
            <button
              onClick={() => {
                const state = loadState();
                console.log(JSON.stringify(state, null, 4));
              }}
            >
              Show stored state
            </button>
            <button
              onClick={() => {
                clearState();
              }}
            >
              Clear stored state
            </button>
          </div>
        )}
      />
    </Switch>
  );
};

export default withRouter(
  connect(
    ({games}) => ({games}),
    {
      addGame: addGameAction,
    }
  )(Router)
);
