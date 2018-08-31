import store from '../../redux';
import {GameRedux} from '../../redux/redux.definitions';

export const getCurrentGame = (): GameRedux => {
  const paths = window.location.pathname.split('/');
  const {games} = store.getState();
  return games[paths[2]];
};
