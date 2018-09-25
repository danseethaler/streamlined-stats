import {
  ADD_SET,
  ADD_STAT,
  TOGGLE_STAT_ADJUSTMENT,
  REMOVE_STAT,
  UPDATE_STAT,
  CLEAR_ALL_STATS,
} from '../constants';
import {StatType} from '../redux.definitions';

export const addSetAction = set => ({
  type: ADD_SET,
  setId: set.id,
  set,
});

export const addStatAction = (setId, stat: StatType) => ({
  type: ADD_STAT,
  setId,
  stat,
});

export const updateStatAction = (setId, index, stat: StatType) => ({
  type: UPDATE_STAT,
  setId,
  index,
  stat,
});

export const removeStatAction = (setId, index) => ({
  type: REMOVE_STAT,
  setId,
  index,
});

export const clearStatsAction = setId => ({
  type: CLEAR_ALL_STATS,
  setId,
});

export const toggleStatAdjustmentAction = (setId, index) => ({
  type: TOGGLE_STAT_ADJUSTMENT,
  setId,
  index,
});
