import {flatten, map} from 'lodash';
import React from 'react';
import {GameRedux, StatTypes} from '../../../redux/redux.definitions';
import players, {PlayerType} from '../../services/players';
import {getStatDefinitions} from '../../services/stats_definitions';
import calculatePlayerStats from './calculatePlayerStats';
import {Td} from './components';

interface PlayerStat {
  shorthand: string;
  value: number;
}

interface CalculatedPlayerStats extends PlayerType {
  stats: PlayerStat[];
}

const getStatsByPlayer = (games: GameRedux[]): CalculatedPlayerStats[] =>
  players.map(player => ({
    ...player,
    stats: calculatePlayerStats(player.name, games),
  }));

const statDefinitions = getStatDefinitions();

const HeaderRowCategoryName = () => (
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      {statDefinitions.map(category => (
        <th key={category.name} colSpan={category.stats.length}>
          {category.name}
        </th>
      ))}
    </tr>
  </thead>
);

const HeaderRowCategoryStat = () => (
  <thead>
    <tr>
      <th />
      <th />
      {statDefinitions.map(({stats}) =>
        stats.map(stat => <th key={stat.shorthand}>{stat.shorthand}</th>)
      )}
    </tr>
  </thead>
);

const playerRows = games => {
  const playerStats = getStatsByPlayer(games);

  return (
    <tbody>
      {map(playerStats, playerStatData => (
        <tr key={playerStatData.jersey}>
          <Td>{playerStatData.jersey}</Td>
          <Td>{playerStatData.name}</Td>
          {playerStatData.stats.map(({shorthand, value}) => (
            <Td key={shorthand}>{value}</Td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const buildStatsTable = (games: GameRedux[]) => {
  return (
    <table className="pure-table pure-table-striped">
      <HeaderRowCategoryName />
      <HeaderRowCategoryStat />
      {playerRows(games)}
    </table>
  );

  // playerStats.map(({player, shorthand}) => {
  //   if (!returnTable[player]) {
  //     returnTable[player] = generateNewStatRow();
  //   }
  //   returnTable[player][shorthand]++;
  // });

  // console.log(JSON.stringify(returnTable, null, 4));
  // return returnTable;
};
