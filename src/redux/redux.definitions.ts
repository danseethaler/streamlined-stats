import {StatShorthands} from '../data/stats';
import {GameAction} from './actions/games';

export const enum StatTypes {
  substitute = 'substitute',
  timeout = 'timeout',
  playerStat = 'playerStat',
}

export interface PlayerStat {
  type: StatTypes.playerStat;
  shorthand: StatShorthands;
  player: string;
}

const enum UsOrOpponent {
  us = 'us',
  opponent = 'opponent',
}

export interface TimeoutStat {
  type: StatTypes.timeout;
  team: UsOrOpponent;
}

export interface SubsitutionStat {
  type: StatTypes.substitute;
  subIn: string;
  subOut: string;
}

export type StatType = PlayerStat | TimeoutStat | SubsitutionStat;

export interface GameRedux extends GameAction {
  rotation: string[];
  stats: StatType[];
}

export interface GamesRedux {
  [key: string]: GameRedux;
}
