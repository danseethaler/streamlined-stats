import produce from 'immer';
import {remove} from 'lodash';
import {
  ADD_GAME,
  ADD_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
} from '../constants';
import {GamesRedux, StatTypes, StatType} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): GamesRedux =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = action.game;
        break;

      case ADD_STAT:
        const statGame = newState[action.game];

        // Swap out rotation players on substitute
        if (action.stat.type === StatTypes.substitute) {
          const currentPlayerIndex = statGame.rotation.findIndex(
            name => name === action.stat.subOut
          );
          statGame.rotation.splice(currentPlayerIndex, 1, action.stat.subIn);
        }

        statGame.stats.unshift(action.stat);
        break;

      case UNDO_LAST_STAT:
        const undoGame = newState[action.game];

        // Remove the most recent stat from the array
        const lastStat: StatType = undoGame.stats.shift();

        if (lastStat && lastStat.type === StatTypes.substitute) {
          // Reverse the substitution
          const currentPlayerIndex = undoGame.rotation.findIndex(
            name => name === lastStat.subIn
          );
          undoGame.rotation.splice(currentPlayerIndex, 1, lastStat.subOut);
        }

        break;

      case UPDATE_STATS_ORDER:
        newState[action.game].stats = action.stats;

        break;
    }
  });
