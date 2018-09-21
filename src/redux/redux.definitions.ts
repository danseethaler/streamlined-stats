export const enum StatTypes {
  timeout = 'timeout',
  playerStat = 'playerStat',
  pointAdjustment = 'pointAdjustment',
}

export interface PlayerStat {
  type: StatTypes.playerStat;
  shorthand: string;
  player: string;
  adjustment?: boolean;
}

export const enum UsOrOpponent {
  us = 'us',
  opponent = 'opponent',
}

export interface TimeoutStat {
  type: StatTypes.timeout;
  team: UsOrOpponent;
}

export interface PointAdjustmentStat {
  type: StatTypes.pointAdjustment;
  team: UsOrOpponent;
}

export type StatType = PlayerStat | TimeoutStat | PointAdjustmentStat;

export interface GameRedux {
  id: string;
  opponent: string;
  set: number;
  stats: StatType[];
}

export interface GamesRedux {
  [key: string]: GameRedux;
}
