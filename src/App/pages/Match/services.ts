import {filter, find} from 'lodash';
import store from '../../../redux';
import {SetType} from '../../../redux/redux.definitions';
import {download} from '../../services/download';
import {getStatsByPlayer, CalculatedPlayerStats} from './Stats/services';

export const getMatchSets = (match: string): SetType[] => {
  const {sets} = store.getState();
  return filter(sets, ({matchId}) => matchId === match);
};

export const getMatchSet = (setId: string) => {
  const {sets} = store.getState();
  return find(sets, ({id}) => id === setId);
};

const getMaxPrepsStatFields = () => [
  'Jersey',
  'MatchGamesPlayed',
  'TotalServes',
  'ServingAces',
  'ServingErrors',
  'ServingPoints',
  'AttacksAttempts',
  'AttacksKills',
  'AttacksErrors',
  'ServingReceivedSuccess',
  'ServingReceivedErrors',
  'BlocksSolo',
  'BlocksAssists',
  'BlocksErrors',
  'BallHandlingAttempt',
  'Assists',
  'AssistsErrors',
  'Digs',
  'DigsErrors',
];

const convertPlayerStatsToMaxPreps = (players: CalculatedPlayerStats[]) => [
  getMaxPrepsStatFields(),
  ...players.map(player => [
    player.jersey[0],
    ...player.stats.map(({value}) => value),
  ]),
];

const convertMaxPrepsDownloadFormat = players =>
  players
    .map(player => {
      const a = player.join('|');

      console.log('a', a);

      return a;
    })
    .join('\n');

export const downloadMaxPrepsExport = (sets: SetType[]) => {
  const playerStats = getStatsByPlayer(sets, true);
  const maxPrepsStats = convertPlayerStatsToMaxPreps(playerStats);
  const statsDownloadFormat = convertMaxPrepsDownloadFormat(maxPrepsStats);
  download(statsDownloadFormat, 'maxPreps_export.txt', 'text/plain');
};
