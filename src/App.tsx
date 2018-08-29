import React from 'react';
import {throttle} from 'lodash';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './App/Router';
import store from './redux';
import {saveState} from './redux/localStorage';

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 500)
);

export default () => (
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);
