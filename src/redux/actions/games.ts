import {
  ADD_GAME,
  ADD_STAT,
  TOGGLE_ADJUSTMENT_LAST_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
} from '../constants';
import {StatType} from '../redux.definitions';

export const addGameAction = game => ({
  type: ADD_GAME,
  game,
});

export const addStatAction = (game, stat: StatType, insertBefore = false) => ({
  type: ADD_STAT,
  game,
  stat,
  insertBefore,
});

export const undoLastStatAction = game => ({
  type: UNDO_LAST_STAT,
  game,
});

export const toggleAdjustmentLastStatAction = game => ({
  type: TOGGLE_ADJUSTMENT_LAST_STAT,
  game,
});

export const updateStatsOrderAction = (game, stats) => ({
  type: UPDATE_STATS_ORDER,
  game,
  stats,
});
