import produce from 'immer';
import {
  ADD_SET,
  ADD_STAT,
  CLEAR_ALL_STATS,
  REMOVE_STAT,
  TOGGLE_STAT_ADJUSTMENT,
  UPDATE_STAT,
} from '../constants';
import {SetsType, StatTypes} from '../redux.definitions';

const updatePriorStat = (priorStat, newStat) => {
  // Change BHA to AST on kill
  if (priorStat.shorthand === 'BHA' && newStat.shorthand === 'K') {
    priorStat.shorthand = 'AST';
  }

  // Change BS to BA on double block
  const previousStatIsBlock = ['BS', 'BA'].indexOf(priorStat.shorthand) >= 0;
  if (previousStatIsBlock && newStat.shorthand === 'BS') {
    priorStat.shorthand = 'BA';
    newStat.shorthand = 'BA';
    newStat.adjustment = true;
  }
};

const initialState = {};

export default (state = initialState, action): SetsType =>
  produce(state, newState => {
    if (action.type === ADD_SET) {
      newState[action.setId] = action.set;
      return;
    }

    const actionSet = newState[action.setId];
    if (!actionSet) {
      return;
    }

    const mostRecentStat = actionSet.stats[0];

    switch (action.type) {
      case UPDATE_STAT:
        if (action.stat.type === StatTypes.playerStat) {
          const priorStat = actionSet.stats[action.index + 1];
          if (priorStat) {
            updatePriorStat(priorStat, action.stat);
          }
          actionSet.stats[action.index] = action.stat;
        }

        break;

      case ADD_STAT:
        if (mostRecentStat) {
          updatePriorStat(mostRecentStat, action.stat);
        }

        actionSet.stats.unshift(action.stat);
        break;

      case REMOVE_STAT:
        actionSet.stats.splice(action.index, 1);
        break;

      case CLEAR_ALL_STATS:
        actionSet.stats = [];
        break;

      case TOGGLE_STAT_ADJUSTMENT:
        const adjustmentStat = actionSet.stats[action.index];

        if (!adjustmentStat || adjustmentStat.type !== StatTypes.playerStat) {
          break;
        }

        adjustmentStat.adjustment = !adjustmentStat.adjustment;
        actionSet.stats[action.index] = adjustmentStat;

        break;
    }
  });
