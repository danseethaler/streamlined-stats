import {getStatDefinition} from '../App/services/stats/categories';
import {StatResultTypes} from '../App/services/stats/stats.definitions';
import {StatType, StatTypes, UsOrOpponent} from './redux.definitions';

export const whoScoredFromStat = (stat: StatType): null | UsOrOpponent => {
  if (stat.type === StatTypes.playerStat) {
    // TODO: In the future we'll add adjustment stats
    // that have a result of point/error but don't cause a point

    const {result} = getStatDefinition(stat.shorthand);

    switch (result) {
      case StatResultTypes.point:
        return UsOrOpponent.us;

      case StatResultTypes.error:
        return UsOrOpponent.opponent;

      case StatResultTypes.nill:
        return null;
    }
  }

  if (stat.type === StatTypes.pointAdjustment) {
    return stat.team;
  }

  return null;
};
