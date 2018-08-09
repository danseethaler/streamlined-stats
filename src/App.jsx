import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './App/Router';
import store from './redux';

export default () => (
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);
