import {flatten} from 'lodash';
import {StatTypes} from '../../../redux/redux.definitions';
import {getStatDefinition} from './categories';
import {
  StatCategories,
  StatCategoryType,
  StatRecordingType,
  StatResultTypes,
} from './stats.definitions';
import {
  getFlatStatsFromSets,
  getPlayerSetsCount,
  getStatCount,
} from './utilities';

const serviceArray = [
  'servus',
  'servis',
  'serviced',
  'service',
  'cervus',
  'surface',
  'serbis',
];

const receivingArray = [
  'reception',
  'reception',
  'reception',
  'perception',
  'perception',
  'reception',
  'reception',
  'perception',
  'receiving',
  'receive',
];

const errorArray = [
  'error',
  'are',
  'air',
  'there',
  'ever',
  'her',
  'heir',
  'your',
  'near',
  'a',
  'terror',
  'errors',
];

const attemptArray = [
  'attempt',
  'attendant',
  'attempt',
  'attempt',
  'at em',
  '1/10',
  'attempt',
  'a tent',
  'a temp',
  'attempt',
  'attempt',
  'attempt',
  'shaka',
  'tempt',
  'temp',
  'tempe',
  'temple',
  'attempts',
  'attempted',
  'a temps',
  '10th',
  'to 10',
  'and 10',
  'tent',
  'tent',
  'tant',
  'tenth',
];

const digArray = [
  'dig',
  'digging',
  'didinger',
  'digit',
  'jake',
  'pig',
  'did',
  'dude',
  'i did',
  'david',
  'doing',
  'big',
  'stage',
  'did you',
  'dirty',
  'dead',
  'thin',
  'dear',
  '30',
  '3d',
  'greg',
  'bag',
  'dick',
];

const ballHandlingArray = [
  'handling',
  'handel',
  'handle',
  'handler',
  'mandolin',
  'hand ling',
  'hand sing',
  'handles',
  'ball handling',
  'ball handeling',
  'all handling',
  'fall handling',
  'hall handling',
  'play annoying',
  'call handling',
  'call handeling',
];

const blockArray = [
  'block',
  'bloc',
  'bloch',
  'fox',
  'lock',
  'vox',
  'box',
  'blocking',
  'locking',
];

const statDefinitions: StatCategoryType[] = [
  {
    name: StatCategories.General,
    stats: [
      {
        name: 'Sets Played',
        shorthand: 'SP',
        calculator: getPlayerSetsCount,
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.calculated,
      },
    ],
  },
  {
    name: StatCategories.Serving,
    stats: [
      {
        name: 'Service Attempt',
        commandNames: [serviceArray, attemptArray],
        shorthand: 'SA',
        calculator: getStatCount(['SA', 'A', 'SE']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Ace',
        commandNames: [
          [
            'a',
            'ace',
            'eggs',
            'areas',
            'hayes',
            'size',
            'ice',
            "a's",
            'hays',
            'is',
            "it's",
          ],
        ],
        shorthand: 'A',
        calculator: getStatCount(['A']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Service Error',
        commandNames: [serviceArray, errorArray],
        shorthand: 'SE',
        calculator: getStatCount(['SE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Service Rotation Points',
        shorthand: 'PTS',
        calculator: (name, sets) => {
          const statsArray = getFlatStatsFromSets(sets);

          let isServing = false;

          return statsArray.reduceRight((points, stat) => {
            if (stat.type === StatTypes.playerStat) {
              if (stat.player === name) {
                if (stat.shorthand === 'A') {
                  points++;
                }
                if (stat.shorthand === 'SA') {
                  isServing = true;
                }
              }

              if (isServing) {
                const statDefintion = getStatDefinition(stat.shorthand);

                if (statDefintion.result === StatResultTypes.point) {
                  points++;
                  isServing = false;
                }

                if (statDefintion.result === StatResultTypes.error) {
                  isServing = false;
                }
              }
            }

            return points;
          }, 0);
        },
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.calculated,
      },
    ],
  },
  {
    name: StatCategories.Attack,
    stats: [
      {
        name: 'Attack Attempt',
        commandNames: [attemptArray],
        shorthand: 'ATT',
        calculator: getStatCount(['ATT', 'K', 'E']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Kill',
        commandNames: [
          [
            'kill',
            'chill',
            'killed',
            'kilo',
            'jill',
            'chill',
            'pill',
            'carol',
            'channel',
            'cairo',
            'churchill',
            'kiehl',
            'cahill',
          ],
        ],
        shorthand: 'K',
        calculator: getStatCount(['K']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Attack Error',
        commandNames: [errorArray],
        shorthand: 'E',
        calculator: getStatCount(['E']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Freeball',
        commandNames: [
          [
            'freeball',
            'free ball',
            'pre-bowl',
            'spree bowl',
            'spree ball',
            'pretty ball',
            'brie bowl',
            'pre bowl',
            'free ball',
            'brie ball',
            'pre ball',
            'friebel',
          ],
        ],
        shorthand: 'FB',
        calculator: getStatCount(['FB']),
        maxPrepsCalculator: null,
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.Receiving,
    stats: [
      {
        name: 'Receiving 1',
        commandNames: [
          receivingArray,
          ['one', '1', 'won', 'one', '1', '1:00', 'juan', 'won'],
        ],
        shorthand: 'R1',
        calculator: getStatCount(['R1']),
        maxPrepsCalculator: getStatCount(['R1', 'R2', 'R3']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Receiving 2',
        commandNames: [receivingArray, ['two', '2', 'to']],
        shorthand: 'R2',
        calculator: getStatCount(['R2']),
        maxPrepsCalculator: null,
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Receiving 3',
        commandNames: [
          receivingArray,
          [
            'tree',
            'thee',
            'three',
            '3',
            'in three',
            'and 3',
            'and three',
            'in 3',
          ],
        ],
        shorthand: 'R3',
        calculator: getStatCount(['R3']),
        maxPrepsCalculator: null,
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Receiving Error',
        commandNames: [receivingArray, errorArray],
        shorthand: 'RE',
        calculator: getStatCount(['RE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.Blocking,
    stats: [
      {
        name: 'Solo Block',
        commandNames: [blockArray],
        shorthand: 'BS',
        calculator: getStatCount(['BS']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Assisted Block',
        shorthand: 'BA',
        calculator: getStatCount(['BA']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Blocking Error',
        commandNames: [blockArray, errorArray],
        shorthand: 'BE',
        calculator: getStatCount(['BE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.BallHandling,
    stats: [
      {
        name: 'Handling Attempt',
        commandNames: [ballHandlingArray],
        shorthand: 'BHA',
        calculator: getStatCount(['BHA', 'AST', 'BHE']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Handling Assist',
        shorthand: 'AST',
        calculator: getStatCount(['AST']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Handling Error',
        commandNames: [ballHandlingArray, errorArray],
        shorthand: 'BHE',
        calculator: getStatCount(['BHE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.Digs,
    stats: [
      {
        name: 'Dig',
        commandNames: [digArray],
        shorthand: 'D',
        calculator: getStatCount(['D']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Dig Error',
        commandNames: [
          [
            ...flatten(
              digArray.map(dig => errorArray.map(error => dig + ' ' + error))
            ),
            'dig error',
            'diggler',
            'take care',
            'figure',
            'daycare',
            'duke energy',
            'duke are',
            'digging are',
            'digging are',
            'digger',
            'bigger',
            'dare to',
            'dig',
            'big',
          ],
        ],
        shorthand: 'DE',
        calculator: getStatCount(['DE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
    ],
  },
];

export default statDefinitions;
