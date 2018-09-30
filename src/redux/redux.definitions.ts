export const enum StatTypes {
  timeout = 'timeout',
  playerStat = 'playerStat',
  pointAdjustment = 'pointAdjustment',
  noMatch = 'noMatch',
}

export interface PlayerStat {
  type: StatTypes.playerStat;
  timestamp: number;
  audioUrl?: string;
  shorthand: string;
  player: string;
  adjustment?: boolean;
}

export interface TimeoutStat {
  type: StatTypes.timeout;
  timestamp: number;
  audioUrl?: string;
  team: UsOrOpponent;
}

export interface PointAdjustmentStat {
  type: StatTypes.pointAdjustment;
  timestamp: number;
  audioUrl?: string;
  team: UsOrOpponent;
}

export interface NoMatchStat {
  type: StatTypes.noMatch;
  timestamp: number;
  audioUrl?: string;
  results: string[];
}

export type StatType =
  | PlayerStat
  | TimeoutStat
  | PointAdjustmentStat
  | NoMatchStat;

export interface SetType {
  id: string;
  matchId: string;
  setNumber: number;
  recordingStartTime?: number;
  stats: StatType[];
}

export interface SetsType {
  [key: string]: SetType;
}

export interface MatchType {
  id: string;
  opponent: string;
  home: boolean;
  date: string;
}

export interface MatchesType {
  [key: string]: MatchType;
}

export const enum UsOrOpponent {
  us = 'us',
  opponent = 'opponent',
}
