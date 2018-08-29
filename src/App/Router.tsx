import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';

export default () => (
  <Switch>
    <Route path="/game/:id" component={Game} />
    <Route component={Home} />
  </Switch>
);
