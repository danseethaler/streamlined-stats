import {
  getManualRecordedStats,
  StatCategories,
} from '../../../services/stats_definitions';
import {getCurrentGame} from '../../../services/redux';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../redux/redux.definitions';

const firstRelevantStat = (stat: StatType) => {
  switch (stat.type) {
    case StatTypes.playerStat:
    case StatTypes.pointAdjustment:
      return true;

    case StatTypes.timeout:
    case StatTypes.substitute:
      return false;
  }
};

const playerStatRelevantNextCategoriesMap = {
  SA: [StatCategories.Blocking, StatCategories.Digs],
  A: [StatCategories.Serving],
  SE: [StatCategories.Receiving],
  R1: [StatCategories.BallHandling, StatCategories.Attack],
  R2: [StatCategories.BallHandling, StatCategories.Attack],
  R3: [StatCategories.BallHandling, StatCategories.Attack],
  RE: [StatCategories.Receiving],
  BS: [StatCategories.Serving],
  BA: [StatCategories.Serving],
  BE: [StatCategories.Receiving],
  D: [StatCategories.BallHandling, StatCategories.Attack],
  DE: [StatCategories.Receiving],
  BHA: [StatCategories.Attack],
  AST: [StatCategories.Attack],
  BHE: [StatCategories.Receiving],
  ATT: [StatCategories.Blocking, StatCategories.Digs],
  K: [StatCategories.Serving],
  E: [StatCategories.Receiving],
  FB: [StatCategories.Blocking, StatCategories.Digs],
};

const getRelevantCategoryNames = stat => {
  switch (stat.type) {
    case StatTypes.pointAdjustment:
      if (stat.team === UsOrOpponent.us) {
        return [StatCategories.Serving];
      } else {
        return [StatCategories.Receiving];
      }

    case StatTypes.playerStat:
      return playerStatRelevantNextCategoriesMap[stat.shorthand];
  }
};

export const getRelevantCategories = () => {
  const statDefinitions = getManualRecordedStats();

  const {stats} = getCurrentGame();
  if (!stats.length) {
    return statDefinitions;
  }

  const statistic = stats.find(firstRelevantStat);

  const relevantCategoryNames = getRelevantCategoryNames(statistic);
  console.log('relevantCategoryNames', relevantCategoryNames);

  return statDefinitions.filter(
    ({name}) => relevantCategoryNames.indexOf(name) >= 0
  );
};
