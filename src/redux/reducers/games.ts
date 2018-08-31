import produce from 'immer';
import {remove} from 'lodash';
import {ADD_GAME, ADD_STAT, UNDO_LAST_STAT} from '../constants';
import {GamesRedux, StatTypes} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): GamesRedux =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_GAME:
        newState[action.game.id] = action.game;
        newState[action.game.id].rotation = action.game.lineup.sort();
        newState[action.game.id].stats = [];
        break;

      case ADD_STAT:
        const statGame = newState[action.game];

        // Swap out rotation players on substitute
        if (action.stat.type === StatTypes.substitute) {
          remove(statGame.rotation, player => player === action.stat.subOut);
          statGame.rotation.push(action.stat.subIn);
          statGame.rotation.sort();
        }

        statGame.stats.push(action.stat);
        break;

      case UNDO_LAST_STAT:
        const undoGame = newState[action.game];

        // Remove the most recent stat from the array
        const lastStat = undoGame.stats.pop();

        if (lastStat && lastStat.type === StatTypes.substitute) {
          // Reverse the substitution
          remove(undoGame.rotation, player => player === lastStat.subIn);
          undoGame.rotation.push(lastStat.subOut);
          undoGame.rotation.sort();
        }

        break;
    }
  });
