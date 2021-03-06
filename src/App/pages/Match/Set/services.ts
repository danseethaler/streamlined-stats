import {reduce} from 'lodash';
import {
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../redux/redux.definitions';
import {getStatDefinition} from '../../../services/stats/categories';
import {StatResultTypes} from '../../../services/stats/stats.definitions';

export const getScores = (stats: StatType[]) =>
  reduce(
    stats,
    (pointObject, stat) => {
      if (stat.type === StatTypes.pointAdjustment) {
        pointObject[stat.team]++;
      } else if (stat.type === StatTypes.playerStat && !stat.adjustment) {
        const {result} = getStatDefinition(stat.shorthand);

        if (result === StatResultTypes.point) {
          pointObject[UsOrOpponent.us]++;
        } else if (result === StatResultTypes.error) {
          pointObject[UsOrOpponent.opponent]++;
        }
      }
      return pointObject;
    },
    {
      us: 0,
      opponent: 0,
    }
  );
