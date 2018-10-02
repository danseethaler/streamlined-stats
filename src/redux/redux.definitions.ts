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
  review?: boolean;
}

export interface TimeoutStat {
  type: StatTypes.timeout;
  timestamp: number;
  team: UsOrOpponent;
  audioUrl?: string;
  review?: boolean;
}

export interface PointAdjustmentStat {
  type: StatTypes.pointAdjustment;
  timestamp: number;
  team: UsOrOpponent;
  audioUrl?: string;
  review?: boolean;
}

export interface NoMatchStat {
  type: StatTypes.noMatch;
  timestamp: number;
  results: string[];
  audioUrl?: string;
  review?: boolean;
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
