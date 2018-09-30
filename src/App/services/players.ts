export interface PlayerType {
  jersey: number[];
  name: string;
  nameFull: string;
  year: string;
  positions: string[];
  height: string;
  captain?: boolean;
}

export const getPlayerData = (playerName): PlayerType =>
  players.find(({name}) => name === playerName);

const players = [
  {
    jersey: [2],
    name: 'Juliann',
    nameFull: 'Juliann De Jesus',
    year: 'Sr.',
    positions: ['RS', 'OH'],
    height: '5-5',
  },
  {
    jersey: [4],
    name: 'Emma',
    nameFull: 'Emma Downing',
    year: 'Jr.',
    positions: ['MB', 'RS'],
    height: '5-11',
  },
  {
    jersey: [5],
    name: 'Macy',
    nameFull: 'Macy Henry',
    year: 'Sr.',
    positions: ['S', 'RS'],
    captain: true,
    height: '5-8',
  },
  {
    jersey: [6],
    name: 'Kennedy',
    nameFull: 'Kennedy Herold-Rhoe',
    year: 'Sr.',
    positions: ['DS'],
    height: '5-7',
  },
  {
    jersey: [7],
    name: 'Kat',
    nameFull: 'Kat Dameron',
    year: 'Jr.',
    positions: ['DS'],
    height: '4-11',
  },
  {
    jersey: [8],
    name: 'Celeste',
    nameFull: 'Celeste Pasley',
    year: 'Jr.',
    positions: ['OH', 'MB', 'OPP'],
    height: '5-9',
  },
  {
    jersey: [9],
    name: 'Cailyn',
    nameFull: 'Cailyn Thornton',
    year: 'Jr.',
    positions: ['OH', 'DS'],
    height: '5-4',
  },
  {
    jersey: [10],
    name: 'Victoria',
    nameFull: 'Victoria Dalehite',
    year: 'Jr.',
    positions: ['OH', 'RS'],
    height: '5-7',
  },
  {
    jersey: [11],
    name: 'Lydia',
    nameFull: 'Lydia Wood',
    year: 'Fr.',
    positions: ['MH', 'OH'],
    height: '5-11',
  },
  {
    jersey: [18],
    name: 'Colby',
    nameFull: 'Colby Rabalais',
    year: 'Sr.',
    positions: ['OH', 'DS'],
    height: '5-7',
  },
  {
    jersey: [19],
    name: 'Sarah',
    nameFull: 'Sarah McCuiston',
    year: 'Sr.',
    positions: ['MB', 'OH'],
    height: '5-11',
  },
  {
    jersey: [20, 3],
    name: 'Rachel',
    nameFull: 'Rachel Tucker',
    year: 'Sr.',
    positions: ['LB'],
    captain: true,
    height: '5-6',
  },
  {
    jersey: [1, 17],
    name: 'Marlee',
    nameFull: 'Marlee Rakouskas-Rhoe',
    year: 'So.',
    positions: ['DS', 'OH'],
    height: '5-5',
  },
  {
    jersey: [12, 14],
    name: 'Haylee',
    nameFull: 'Haylee Cothran',
    year: 'So.',
    positions: ['DS', 'OH'],
    height: '5-7',
  },
  {
    jersey: [15, 16],
    name: 'Hannah',
    nameFull: 'Hannah Weaks',
    year: 'Sr.',
    positions: ['RS', 'OH'],
    height: '5-8',
  },
] as PlayerType[];

export default players;
