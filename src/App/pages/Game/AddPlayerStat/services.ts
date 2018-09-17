import {
  StatType,
  StatTypes,
  UsOrOpponent,
  GameRedux,
  StatsAssignment,
} from '../../../../redux/redux.definitions';
import {
  getCategoriesByName,
  getManualRecordedStats,
} from '../../../services/stats/categories';
import {
  StatCategories,
  StatCategoryType,
} from '../../../services/stats/stats.definitions';
import {CurrentPlayStatus} from './add_player_stat.definitions';

const getFirstRelevantStat = (stats: StatType[]) =>
  stats.find((stat: StatType) => {
    switch (stat.type) {
      case StatTypes.playerStat:
      case StatTypes.pointAdjustment:
        return true;

      case StatTypes.timeout:
      case StatTypes.substitute:
        return false;
    }
  });

const pointAdjustmentPlayStatusMap = {
  [UsOrOpponent.us]: CurrentPlayStatus.serving,
  [UsOrOpponent.opponent]: CurrentPlayStatus.receiving,
};

const playerStatPlayStatusMap = {
  SA: CurrentPlayStatus.rallying,
  A: CurrentPlayStatus.serving,
  SE: CurrentPlayStatus.receiving,
  R1: CurrentPlayStatus.rallying,
  R2: CurrentPlayStatus.rallying,
  R3: CurrentPlayStatus.rallying,
  RE: CurrentPlayStatus.receiving,
  BS: CurrentPlayStatus.serving,
  BA: CurrentPlayStatus.serving,
  BE: CurrentPlayStatus.receiving,
  D: CurrentPlayStatus.rallying,
  DE: CurrentPlayStatus.receiving,
  BHA: CurrentPlayStatus.rallying,
  AST: CurrentPlayStatus.rallying,
  BHE: CurrentPlayStatus.receiving,
  ATT: CurrentPlayStatus.rallying,
  K: CurrentPlayStatus.serving,
  E: CurrentPlayStatus.receiving,
  FB: CurrentPlayStatus.rallying,
};

const getCurrentPlayStatusFromStat = (stat): CurrentPlayStatus => {
  switch (stat.type) {
    case StatTypes.pointAdjustment:
      return pointAdjustmentPlayStatusMap[stat.team];

    case StatTypes.playerStat:
      return playerStatPlayStatusMap[stat.shorthand];
  }
};

const getCategoryOptions = (playStatus: CurrentPlayStatus) => {
  const statCategories = getManualRecordedStats();
  switch (playStatus) {
    case CurrentPlayStatus.serving:
      return statCategories.filter(
        ({name}) => [StatCategories.Serving].indexOf(name) >= 0
      );

    case CurrentPlayStatus.receiving:
      return statCategories.filter(
        ({name}) => [StatCategories.Receiving].indexOf(name) >= 0
      );

    case CurrentPlayStatus.rallying:
      return statCategories.filter(
        ({name}) =>
          [
            StatCategories.Attack,
            StatCategories.Digs,
            StatCategories.BallHandling,
            StatCategories.Blocking,
          ].indexOf(name) >= 0
      );
  }
};

export const getCurrentStatCategoryOptions = (
  game: GameRedux
): StatCategoryType[] => {
  switch (game.statsAssignment) {
    case StatsAssignment.serving:
      return getManualRecordedStats().filter(
        ({name}) => ['Serving', 'Ball Handling', 'Attack'].indexOf(name) >= 0
      );

    case StatsAssignment.receiving:
      return getManualRecordedStats().filter(
        ({name}) => ['Receiving', 'Digs', 'Blocking'].indexOf(name) >= 0
      );

    case StatsAssignment.all:
      const firstReferenceStat = getFirstRelevantStat(game.stats);

      if (!firstReferenceStat) {
        return game.serveFirst
          ? getCategoriesByName([StatCategories.Serving])
          : getCategoriesByName([StatCategories.Receiving]);
      }

      const currentPlayStatus = getCurrentPlayStatusFromStat(
        firstReferenceStat
      );

      return getCategoryOptions(currentPlayStatus);
  }
};
