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

export const enum StatsAssignment {
  receiving = 'receiving',
  serving = 'serving',
  all = 'all',
  voice = 'voice',
}

export interface GameRedux {
  id: string;
  opponent: string;
  set: number;
  serveFirst: boolean;
  usingRotation: boolean;
  statsAssignment: StatsAssignment;
  lineup: string[];
  stats: StatType[];
}

export interface GamesRedux {
  [key: string]: GameRedux;
}
