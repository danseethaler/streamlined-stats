import produce from 'immer';
import {
  ADD_SET,
  ADD_STAT,
  TOGGLE_ADJUSTMENT_LAST_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
} from '../constants';
import {SetsType, StatTypes} from '../redux.definitions';

const initialState = {};

export default (state = initialState, action): SetsType =>
  produce(state, newState => {
    switch (action.type) {
      case ADD_SET:
        newState[action.set.id] = action.set;
        break;

      case ADD_STAT:
        const statSet = newState[action.set];
        const lastStat = statSet.stats[0];

        if (lastStat) {
          // Change BHA to AST on kill
          if (lastStat.shorthand === 'BHA' && action.stat.shorthand === 'K') {
            statSet.stats[0].shorthand = 'AST';
          }

          // Change BS to BA on double block
          const lastStatIsBlock = ['BS', 'BA'].indexOf(lastStat.shorthand) >= 0;
          if (lastStatIsBlock && action.stat.shorthand === 'BS') {
            statSet.stats[0].shorthand = 'BA';
            action.stat.shorthand = 'BA';
          }
        }

        statSet.stats.unshift(action.stat);
        break;

      case UNDO_LAST_STAT:
        const undoSet = newState[action.set];
        undoSet.stats.shift();

        break;

      case TOGGLE_ADJUSTMENT_LAST_STAT:
        const priorSet = newState[action.set];
        const priorStat = priorSet.stats.shift();

        if (!priorStat) {
          break;
        }

        if (priorStat.type === StatTypes.playerStat) {
          priorStat.adjustment = !priorStat.adjustment;
        }
        priorSet.stats.unshift(priorStat);

        break;

      case UPDATE_STATS_ORDER:
        newState[action.set].stats = action.stats;

        break;
    }
  });
