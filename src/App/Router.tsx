import React from 'react';
import {Route, Switch} from 'react-router-dom';
import store from '../redux';
import Admin from './pages/Admin';
import Game from './pages/Game';
import Home from './pages/Home';
import Stats from './pages/Stats';
import StatsInfo from './pages/StatsInfo';

export default () => (
  <Switch>
    <Route path="/game/:id" component={Game} />
    <Route
      path="/stats"
      render={() => <Stats games={store.getState().games} />}
    />
    <Route path="/stats-info" component={StatsInfo} />} />
    <Route path="/admin" component={Admin} />} />
    <Route component={Home} />
  </Switch>
);
