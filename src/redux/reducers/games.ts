import produce from 'immer';
import {
  ADD_GAME,
  ADD_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
} from '../constants';
import {GamesRedux} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): GamesRedux =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = action.game;
        break;

      case ADD_STAT:
        const statGame = newState[action.game];

        if (action.insertBefore) {
          // Put the stat before the most recent stat
          statGame.stats.splice(1, 0, action.stat);
        } else {
          statGame.stats.unshift(action.stat);
        }
        break;

      case UNDO_LAST_STAT:
        const undoGame = newState[action.game];
        undoGame.stats.shift();

        break;

      case UPDATE_STATS_ORDER:
        newState[action.game].stats = action.stats;

        break;
    }
  });
