import _ from 'lodash';

export interface PlayerType {
  jersey: number[];
  name: string;
  nameFull: string;
  year: string;
  positions: string[];
  height: string;
  captain?: boolean;
  varsity?: boolean;
}

export const getPlayerData = (playerName): PlayerType =>
  players.find(({name}) => name === playerName);

const jvPlayers = [
  {
    jersey: [2],
    name: 'Nadia',
    nameFull: 'Nadia Slanker',
    year: 9,
    height: '5-9',
    positions: ['MB', 'MH'],
  },
  {
    jersey: [3],
    name: 'Phoenix',
    nameFull: 'Phoenix Smith',
    year: 10,
    height: '5-3',
    positions: ['DS', 'S'],
  },
  {
    jersey: [4],
    name: 'Rachel',
    nameFull: 'Rachel Romska',
    year: 9,
    height: '5-6',
    positions: ['DS', 'OH'],
  },
  {
    jersey: [5],
    name: 'Grace Casper',
    nameFull: 'Grace Casper',
    year: 9,
    height: '5-5',
    positions: ['DS', 'S'],
  },
  {
    jersey: [7],
    name: 'Anaya',
    nameFull: 'Anaya Carter',
    year: 9,
    height: '5-6',
    positions: ['OH', 'MB'],
  },
  {
    jersey: [8],
    name: 'Kate',
    nameFull: 'Kate Dasilva',
    year: 10,
    height: '5-6',
    positions: ['RS', 'MB'],
  },
  {
    jersey: [11],
    name: 'Grace Young',
    nameFull: 'Grace Young',
    year: 9,
    height: '5-5',
    positions: ['S', 'DS'],
  },
  {
    jersey: [15],
    name: 'Lauren',
    nameFull: 'Lauren Cecil',
    year: 9,
    height: '5-6',
    positions: ['MB', 'RS'],
  },
  {
    jersey: [3],
    name: 'Ava',
    nameFull: 'Ava Lowry',
    year: 10,
    height: '5-6',
    positions: ['DS', 'RS'],
    varsity: true,
  },
  {
    jersey: [15],
    name: 'Nicol',
    nameFull: 'Nicol Anderson',
    year: 11,
    height: '5-7',
    positions: ['RS', 'OPP'],
    varsity: true,
  },
  {
    jersey: [14, 19],
    name: 'Charlotte',
    nameFull: 'Charlotte Mann',
    year: 9,
    height: '5-9',
    positions: ['MB', 'RS'],
  },
];

const players = [
  {
    jersey: [2],
    name: 'ShiLi',
    nameFull: 'ShiLi Quade',
    year: 'Jr.',
    positions: ['S', 'DS', 'RS'],
    height: '5-5',
  },
  {
    jersey: [4],
    name: 'Emma',
    nameFull: 'Emma Downing',
    year: 'Sr.',
    positions: ['MB', 'RS'],
    height: '5-11',
  },
  {
    jersey: [5],
    name: 'Julie',
    nameFull: 'Julie Altieri',
    year: 'Fr.',
    positions: ['S'],
    height: '5-9',
  },
  {
    jersey: [7],
    name: 'Cameron',
    nameFull: 'Cameron Lloyd',
    year: 'Fr.',
    positions: ['OH', 'OPP', 'RS'],
    height: '5-9',
  },
  {
    jersey: [8],
    name: 'Celeste',
    nameFull: 'Celeste Pasley',
    year: 'Sr.',
    positions: ['MB', 'RS'],
    height: '5-9',
  },
  {
    jersey: [9],
    name: 'Cailyn',
    nameFull: 'Cailyn Thornton',
    year: 'Sr.',
    positions: ['OH', 'DS'],
    height: '5-4',
  },
  {
    jersey: [10],
    name: 'Tori',
    nameFull: 'Victoria Dalehite',
    year: 'Sr.',
    positions: ['OH', 'RS'],
    height: '5-7',
  },
  {
    jersey: [12],
    name: 'Layne',
    nameFull: 'Layne Foster',
    year: 'Jr.',
    positions: ['S'],
    height: '5-11',
  },
  {
    jersey: [1, 17],
    name: 'Marlee',
    nameFull: 'Marlee Rakouskas',
    year: 'Jr.',
    positions: ['DS', 'L', 'OH'],
    height: '5-5',
  },
  {
    jersey: [18, 14],
    name: 'Haylee',
    nameFull: 'Haylee Cothran',
    year: 'Jr.',
    positions: ['DS', 'OH'],
    height: '5-7',
  },
  {
    jersey: [19],
    name: 'Cam',
    nameFull: 'Cameron Lanier',
    year: 'Fr.',
    positions: ['OH', 'RS'],
    height: '6-0',
  },
  ..._.filter(jvPlayers, 'varsity'),
] as PlayerType[];

export default players;
