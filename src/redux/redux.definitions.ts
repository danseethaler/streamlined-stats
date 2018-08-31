import {GameAction} from './actions/games';

export const enum StatTypes {
  substitute = 'substitute',
  timeout = 'timeout',
  playerStat = 'playerStat',
  pointAdjustment = 'pointAdjustment',
}

export interface PlayerStat {
  type: StatTypes.playerStat;
  shorthand: string;
  player: string;
}

export const enum UsOrOpponent {
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

export interface PointAdjustmentStat {
  type: StatTypes.pointAdjustment;
  team: UsOrOpponent;
}

export type StatType =
  | PlayerStat
  | TimeoutStat
  | SubsitutionStat
  | PointAdjustmentStat;

export interface GameRedux extends GameAction {
  rotation: string[];
  stats: StatType[];
}

export interface GamesRedux {
  [key: string]: GameRedux;
}
