import {ADD_GAME, ADD_STAT, UNDO_LAST_STAT} from '../constants';
import {StatType} from '../redux.definitions';

export interface GameAction {
  id: string;
  opponent: string;
  set: number;
  lineup: string[];
}

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
