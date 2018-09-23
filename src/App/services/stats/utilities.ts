import {filter, flatten, map, some, values} from 'lodash';
import {SetsType, SetType, StatTypes} from '../../../redux/redux.definitions';

export const getFlatStatsFromSets = (sets: SetsType) =>
  flatten(map(sets, ({stats}) => values(stats)));

export const getStatCount = statShorthands => (name, sets: SetsType) =>
  getFlatStatsFromSets(sets).reduce((statCount, stat) => {
    if (stat.type === StatTypes.playerStat) {
      if (stat.player === name) {
        if (statShorthands.indexOf(stat.shorthand) >= 0) {
          statCount++;
        }
      }
    }

    return statCount;
  }, 0);

export const getPlayerSetsCount = (name: string, sets: SetsType): number =>
  filter(sets, set => didPlayerPlayInSet(name, set)).length;

export const didPlayerPlayInSet = (name: string, set: SetType): boolean =>
  some(
    set.stats,
    stat => stat.type === StatTypes.playerStat && stat.player === name
  );
