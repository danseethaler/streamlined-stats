import {
  ADD_GAME,
  ADD_STAT,
  UNDO_LAST_STAT,
  UPDATE_STATS_ORDER,
} from '../constants';
import {StatType} from '../redux.definitions';

export interface SubstituteAction {
  subOut: string;
  subIn: string;
  game: string;
}

export const addGameAction = game => ({
  type: ADD_GAME,
  game,
});

export const addStatAction = (game, stat: StatType) => ({
  type: ADD_STAT,
  game,
  stat,
});

export const undoLastStatAction = game => ({
  type: UNDO_LAST_STAT,
  game,
});

export const updateStatsOrderAction = (game, stats) => ({
  type: UPDATE_STATS_ORDER,
  game,
  stats,
});
