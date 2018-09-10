export interface PlayerType {
  jersey: string;
  name: string;
  nameFull: string;
  year: string;
  photoPath: string;
  positions: string[];
  height: string;
  captain?: boolean;
}

export const getPlayerData = (playerName): PlayerType =>
  players.find(({name}) => name === playerName);

const players = [
  {
    jersey: '2',
    name: 'Juliann',
    photoPath: require('../../assets/photos/juliann.png'),
    nameFull: 'Juliann De Jesus',
    year: 'Sr.',
    positions: ['RS', 'OH'],
    height: '5-5',
  },
  {
    jersey: '4',
    name: 'Emma',
    photoPath: require('../../assets/photos/emma.png'),
    nameFull: 'Emma Downing',
    year: 'Jr.',
    positions: ['MB', 'RS'],
    height: '5-11',
  },
  {
    jersey: '5',
    name: 'Macy',
    photoPath: require('../../assets/photos/macy.png'),
    nameFull: 'Macy Henry',
    year: 'Sr.',
    positions: ['S', 'RS'],
    captain: true,
    height: '5-8',
  },
  {
    jersey: '6',
    name: 'Kennedy',
    photoPath: require('../../assets/photos/kennedy.png'),
    nameFull: 'Kennedy Herold-Rhoe',
    year: 'Sr.',
    positions: ['DS'],
    height: '5-7',
  },
  {
    jersey: '7',
    name: 'Kat',
    photoPath: require('../../assets/photos/kat.png'),
    nameFull: 'Kat Dameron',
    year: 'Jr.',
    positions: ['DS'],
    height: '4-11',
  },
  {
    jersey: '8',
    name: 'Celeste',
    photoPath: require('../../assets/photos/celeste.png'),
    nameFull: 'Celeste Pasley',
    year: 'Jr.',
    positions: ['OH', 'MB', 'OPP'],
    height: '5-9',
  },
  {
    jersey: '9',
    name: 'Cailyn',
    photoPath: require('../../assets/photos/cailyn.png'),
    nameFull: 'Cailyn Thornton',
    year: 'Jr.',
    positions: ['OH', 'DS'],
    height: '5-4',
  },
  {
    jersey: '10',
    name: 'Victoria',
    photoPath: require('../../assets/photos/victoria.png'),
    nameFull: 'Victoria Dalehite',
    year: 'Jr.',
    positions: ['OH', 'RS'],
    height: '5-7',
  },
  {
    jersey: '11',
    name: 'Lydia',
    photoPath: require('../../assets/photos/lydia.png'),
    nameFull: 'Lydia Wood',
    year: 'Fr.',
    positions: ['MH', 'OH'],
    height: '5-11',
  },
  {
    jersey: '18',
    name: 'Colby',
    photoPath: require('../../assets/photos/colby.png'),
    nameFull: 'Colby Rabalais',
    year: 'Sr.',
    positions: ['OH', 'DS'],
    height: '5-7',
  },
  {
    jersey: '19',
    name: 'Sarah',
    photoPath: require('../../assets/photos/sarah.png'),
    nameFull: 'Sarah McCuiston',
    year: 'Sr.',
    positions: ['MB', 'OH'],
    height: '5-11',
  },
  {
    jersey: '20',
    name: 'Rachel',
    photoPath: require('../../assets/photos/rachel.png'),
    nameFull: 'Rachel Tucker',
    year: 'Sr.',
    positions: ['LB'],
    captain: true,
    height: '5-6',
  },
  {
    jersey: '1/17',
    name: 'Marlee',
    photoPath: require('../../assets/photos/marlee.png'),
    nameFull: 'Marlee Rakouskas-Rhoe',
    year: 'So.',
    positions: ['DS', 'OH'],
    height: '5-5',
  },
  {
    jersey: '12/14',
    name: 'Haylee',
    photoPath: require('../../assets/photos/haylee.png'),
    nameFull: 'Haylee Cothran',
    year: 'So.',
    positions: ['DS', 'OH'],
    height: '5-7',
  },
  {
    jersey: '15/16',
    name: 'Hannah',
    photoPath: require('../../assets/photos/hannah.png'),
    nameFull: 'Hannah Weaks',
    year: 'Sr.',
    positions: ['RS', 'OH', 'S'],
    height: '5-8',
  },
] as PlayerType[];

export default players;
