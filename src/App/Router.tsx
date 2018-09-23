import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Match from './pages/Match';
import StatsInfo from './pages/StatsInfo';

export default () => (
  <Switch>
    <Route path="/match/:matchId" component={Match} />} />
    <Route path="/admin" component={Admin} />} />
    <Route path="/stats-info" component={StatsInfo} />} />
    <Route component={Home} />
  </Switch>
);
