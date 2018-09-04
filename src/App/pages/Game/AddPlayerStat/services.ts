import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../redux/redux.definitions';
import {getCurrentGame} from '../../../services/redux';
import {
  getManualRecordedStats,
  StatCategories,
  StatCategoryType,
} from '../../../services/stats/definitions';

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
  SA: [StatCategories.Digs, StatCategories.Blocking, StatCategories.Attack],
  A: [StatCategories.Serving],
  SE: [StatCategories.Receiving],
  R1: [StatCategories.BallHandling, StatCategories.Attack, StatCategories.Digs],
  R2: [StatCategories.BallHandling, StatCategories.Attack, StatCategories.Digs],
  R3: [StatCategories.BallHandling, StatCategories.Attack, StatCategories.Digs],
  RE: [StatCategories.Receiving],
  BS: [StatCategories.Serving],
  BA: [StatCategories.Serving],
  BE: [StatCategories.Receiving],
  D: [StatCategories.BallHandling, StatCategories.Attack],
  DE: [StatCategories.Receiving],
  BHA: [StatCategories.Attack],
  AST: [StatCategories.Attack],
  BHE: [StatCategories.Receiving],
  ATT: [StatCategories.Digs, StatCategories.Blocking],
  K: [StatCategories.Serving],
  E: [StatCategories.Receiving],
  FB: [StatCategories.Digs, StatCategories.Blocking],
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

export const getRelevantCategories = (): StatCategoryType[] => {
  const statDefinitions = getManualRecordedStats();

  const {stats} = getCurrentGame();

  const statistic = stats.find(firstRelevantStat);

  if (!statistic) {
    return statDefinitions;
  }

  // TEMP
  // return statDefinitions;

  const relevantCategoryNames = getRelevantCategoryNames(statistic);

  return relevantCategoryNames.map(categoryName =>
    statDefinitions.find(({name}) => categoryName === name)
  );
};
