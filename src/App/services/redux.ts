import store from '../../redux';
import {GameRedux} from '../../redux/redux.definitions';

export const getCurrentGame = (): false | GameRedux => {
  const paths = window.location.pathname.split('/');
  if (paths[1] === 'game' && paths[2]) {
    const {games} = store.getState();
    const currentGame = games[paths[2]];
    if (currentGame) {
      return currentGame;
    }
  }
  return false;
};
