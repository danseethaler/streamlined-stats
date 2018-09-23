import {
  ADD_SET,
  ADD_STAT,
  TOGGLE_ADJUSTMENT_LAST_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
} from '../constants';
import {StatType} from '../redux.definitions';

export const addSetAction = set => ({
  type: ADD_SET,
  set,
});

export const addStatAction = (set, stat: StatType, insertBefore = false) => ({
  type: ADD_STAT,
  set,
  stat,
  insertBefore,
});

export const undoLastStatAction = set => ({
  type: UNDO_LAST_STAT,
  set,
});

export const toggleAdjustmentLastStatAction = set => ({
  type: TOGGLE_ADJUSTMENT_LAST_STAT,
  set,
});

export const updateStatsOrderAction = (set, stats) => ({
  type: UPDATE_STATS_ORDER,
  set,
  stats,
});
