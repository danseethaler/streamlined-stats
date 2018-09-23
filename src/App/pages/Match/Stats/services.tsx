import {map} from 'lodash';
import React from 'react';
import {SetType} from '../../../../redux/redux.definitions';
import {TOP_BAR_HEIGHT} from '../../../components/Bits/TopBar';
import players, {PlayerType} from '../../../services/players';
import {getStatCategoryDefinitions} from '../../../services/stats/categories';
import calculatePlayerStats from './calculatePlayerStats';
import {ThSticky} from './components';

interface PlayerStat {
  shorthand: string;
  value: number;
}

interface CalculatedPlayerStats extends PlayerType {
  stats: PlayerStat[];
}

const getStatsByPlayer = (
  sets: SetType[],
  useMaxpreps
): CalculatedPlayerStats[] =>
  players.map(player => ({
    ...player,
    stats: calculatePlayerStats(player.name, sets, useMaxpreps),
  }));

const statDefinitions = getStatCategoryDefinitions();

const HeaderRowCategoryName = ({useMaxpreps}) => (
  <tr>
    <ThSticky offset={TOP_BAR_HEIGHT}>#</ThSticky>
    <ThSticky offset={TOP_BAR_HEIGHT}>Name</ThSticky>
    {statDefinitions.map(category => (
      <ThSticky
        offset={TOP_BAR_HEIGHT}
        key={category.name}
        colSpan={
          category.stats.filter(
            ({maxPrepsCalculator}) =>
              !useMaxpreps || maxPrepsCalculator !== null
          ).length
        }
      >
        {category.name}
      </ThSticky>
    ))}
  </tr>
);

const HeaderRowCategoryStat = ({useMaxpreps}) => (
  <tr>
    <ThSticky offset={103} />
    <ThSticky offset={103} />
    {statDefinitions.map(({stats}) =>
      stats
        .filter(
          ({maxPrepsCalculator}) => !useMaxpreps || maxPrepsCalculator !== null
        )
        .map(stat => (
          <ThSticky offset={103} key={stat.shorthand}>
            {stat.shorthand}
          </ThSticky>
        ))
    )}
  </tr>
);

const playerRows = playerStats =>
  map(playerStats, playerStatData => (
    <tr key={playerStatData.jersey.toString()}>
      <td>{playerStatData.jersey.toString()}</td>
      <td>{playerStatData.name}</td>
      {playerStatData.stats.map(({shorthand, value}) => (
        <td key={shorthand}>{value}</td>
      ))}
    </tr>
  ));

const totalsRow = playerStats => {
  const totalsRowData = playerStats.reduce((totalsData, player) => {
    player.stats.forEach(({value}, index) => {
      if (!totalsData[index]) {
        totalsData[index] = 0;
      }
      totalsData[index] += value;
    });
    return totalsData;
  }, []);

  return (
    <tr>
      <td colSpan={2}>Totals</td>
      {totalsRowData.map((value, index) => (
        <th key={index}>{value}</th>
      ))}
    </tr>
  );
};

export const buildStatsTable = (sets: SetType[], useMaxpreps: boolean) => {
  const playerStats = getStatsByPlayer(sets, useMaxpreps);

  return (
    <table
      className="pure-table pure-table-striped"
      style={{
        marginBottom: 'calc(100vh - 7.3em)',
      }}
    >
      <thead>
        <HeaderRowCategoryName useMaxpreps={useMaxpreps} />
        <HeaderRowCategoryStat useMaxpreps={useMaxpreps} />
      </thead>
      <tbody>
        {playerRows(playerStats)}
        {totalsRow(playerStats)}
      </tbody>
    </table>
  );
};
