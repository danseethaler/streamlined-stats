import {GameRedux} from '../../../redux/redux.definitions';
import {getStatDefinitions} from '../../services/stats/definitions';

interface PlayerStat {
  shorthand: string;
  value: number;
}

export default (name, games: GameRedux[]): PlayerStat[] => {
  const playerStats = [];

  getStatDefinitions().map(({shorthand, calculator}) => {
    const value = calculator(name, games);
    playerStats.push({shorthand, value});
  });

  return playerStats;
};
