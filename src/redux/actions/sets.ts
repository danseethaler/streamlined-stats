import {
  ADD_SET,
  ADD_STAT,
  CLEAR_ALL_STATS,
  REMOVE_STAT,
  TOGGLE_STAT_ADJUSTMENT,
  UPDATE_SET,
  UPDATE_STAT,
} from '../constants';
import {StatType} from '../redux.definitions';

export const addSetAction = set => ({
  type: ADD_SET,
  setId: set.id,
  set,
});

export const updateSetAction = (setId, updates) => ({
  type: UPDATE_SET,
  setId,
  updates,
});

export const addStatAction = (setId, stat: StatType) => ({
  type: ADD_STAT,
  setId,
  stat: {...stat, ...{timestamp: Date.now()}},
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
