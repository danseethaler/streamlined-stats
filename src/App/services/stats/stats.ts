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
  getFlatStatsFromGames,
  getPlayerGamesCount,
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

const attackArray = [
  'attak',
  'atack',
  'attac',
  'attack',
  'kotak',
  'ataque',
  'attaque',
  'tac',
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
  '1/10',
  'attempt',
  'a tent',
  'a temp',
  'attempt',
  'attempt',
  'attempt',
  'shaka',
  'tempt',
  'attempts',
  'attempted',
  'a temps',
];

const digArray = [
  'dig',
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
];

const ballHandlingArray = [
  'handling',
  'ball handling',
  'ball handeling',
  'orlando',
  'all handling',
  'fall handling',
  'hall handling',
  'play annoying',
  'hand ling',
  'hand sing',
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
        calculator: getPlayerGamesCount,
        result: StatResultTypes.nill,
        description: 'Total number of sets played.',
        recordingType: StatRecordingType.calculated,
      },
    ],
  },
  {
    name: StatCategories.Serving,
    stats: [
      {
        name: 'Attempt',
        commandNames: [serviceArray, attemptArray],
        shorthand: 'SA',
        calculator: getStatCount(['SA', 'A', 'SE']),
        result: StatResultTypes.nill,
        description:
          'Total number of service attempts for the game (season). A service attempt is given any time a player attempts to serve the ball or when a player is given a Service Ace or Service Error. A service attempt should also be assigned to a player who - because they were out of rotation- did not serve, but should have served.',
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
        description:
          'Total number of service aces during the game (season). A service ace is awarded when a serve results directly in a point. An ace is also awarded if the receiving team is out of rotation or commits a lift or carry on the first touch.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Error',
        commandNames: [serviceArray, errorArray],
        shorthand: 'SE',
        calculator: getStatCount(['SE']),
        result: StatResultTypes.error,
        description:
          'Total number of service errors during the game (season). A service error is given when the serve lands out of bounds, does not go over the net, or hits the antennea. A service error is also given if the server commits a foot fault, takes too much time or serves out of rotation (given to the player who should have been serving).',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Rotation Points',
        shorthand: 'PTS',
        calculator: (name, games) => {
          const statsArray = getFlatStatsFromGames(games);

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
        description:
          "Total number of points scored by the team while this player was serving. This stat is used to measure a team's effectiveness in each rotation; however, it is not very insightful unless the rotation (line-up) remains consistent. A rotation point is awarded each time this player serves and the team wins the rally.",
        recordingType: StatRecordingType.calculated,
      },
    ],
  },
  {
    name: StatCategories.Attack,
    stats: [
      {
        name: 'Attempt',
        commandNames: [attemptArray],
        shorthand: 'ATT',
        calculator: getStatCount(['ATT', 'K', 'E']),
        result: StatResultTypes.nill,
        description:
          'Total number of attack attempts during the game (season). An attack attempt is recorded any time a player attempts to attack the ball into the opponents court. The ball may be spiked, set, tipped or hit in the attempt.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Kill',
        commandNames: [
          [
            'chill',
            'jill',
            'chill',
            'kill',
            'carol',
            'channel',
            'caro',
            'cairo',
            'general',
          ],
        ],
        shorthand: 'K',
        calculator: getStatCount(['K']),
        result: StatResultTypes.point,
        description:
          'Total number of kills acquired during the game (season). A kill is awarded to a player any time an attack is unreturnable by the opposing team and is a direct cause of the opposing team not returning the ball. A kill is also awarded to the attacker any time the opposing team commits a blocking error. Any time a kill is awarded, an attack attempt must also be awarded.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Error',
        commandNames: [errorArray],
        shorthand: 'E',
        calculator: getStatCount(['E']),
        result: StatResultTypes.error,
        description:
          'Total number of attack errors during the game (season). An attack error is given any time a player hits the ball out of bounds, into the antennea or into the net. An attack that is blocked and not returned by the attacking team is also an attack error. An attack error is also given if the player commits a net foul, center line violation, lift, carry, or backrow attack. An attack attempt must be given everytime an attack error is recorded.',
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
        result: StatResultTypes.nill,
        description: 'Number of free balls sent over to the opponent.',
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.Receiving,
    stats: [
      {
        name: '1',
        commandNames: [
          receivingArray,
          ['one', '1', 'won', 'one', '1', '1:00', 'juan', 'won'],
        ],
        shorthand: 'R1',
        calculator: getStatCount(['R1']),
        result: StatResultTypes.nill,
        description:
          'A service reception is awarded when a player continues play by successfully passing a served ball and the pass does not result in a kill (an overpass) or lead directly to a kill by a teammate (this would be an assist).',
        recordingType: StatRecordingType.manual,
      },
      {
        name: '2',
        commandNames: [receivingArray, ['two', '2', 'to']],
        shorthand: 'R2',
        calculator: getStatCount(['R2']),
        result: StatResultTypes.nill,
        description:
          'A service reception is awarded when a player continues play by successfully passing a served ball and the pass does not result in a kill (an overpass) or lead directly to a kill by a teammate (this would be an assist).',
        recordingType: StatRecordingType.manual,
      },
      {
        name: '3',
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
        result: StatResultTypes.nill,
        description:
          'A service reception is awarded when a player continues play by successfully passing a served ball and the pass does not result in a kill (an overpass) or lead directly to a kill by a teammate (this would be an assist).',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Error',
        commandNames: [receivingArray, errorArray],
        shorthand: 'RE',
        calculator: getStatCount(['RE']),
        result: StatResultTypes.error,
        description:
          "A service reception error is given to a player when the serve hits the floor in the area of the player or if the player passes the serve but it cannot be kept in play by a teammate. A service reception error is also given if the player lifts or carries the served ball on the receiving team's first contact.",
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.Blocking,
    stats: [
      {
        name: 'Solo',
        commandNames: [blockArray],
        shorthand: 'BS',
        calculator: getStatCount(['BS']),
        result: StatResultTypes.point,
        description:
          'Total number of solo blocks during the game (season). A solo block is awarded a single player blocks the ball into the opposing team\'s court leading directly to a point. The blocker must be the only blocker attempting to block the ball. Simply making ball contact that does not result directly in a point during a block attempt should NOT be recorded as any kind of block. This is commonly referred to as a "touch" and is not currently tracked by MaxPreps.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Assisted',
        shorthand: 'BA',
        calculator: getStatCount(['BA']),
        result: StatResultTypes.point,
        description:
          'Total number of assisted blocks during the game (season). An assisted block is awarded when two or three players block the ball back into the opponent\'s court for a point. Each player attempting to block receives an assist even if it is obvious that only one player actually makes contact with the ball. Simply making ball contact that does not result directly in a point during a block attempt should NOT be recorded as any kind of block. This is commonly referred to as a "touch" and is not currently tracked by MaxPreps.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Error',
        commandNames: [blockArray, errorArray],
        shorthand: 'BE',
        calculator: getStatCount(['BE']),
        result: StatResultTypes.error,
        description:
          'Total number of blocking errors during the game (season). A blocking error is assigned when a one of the players attempting to block is called for a violation by the referee during a blocking attempt. Generally this occurs when the blocker commits a net violation, crosses the center line, reaches over the net, lift/carries the ball or attempts to block from the back row.',
        recordingType: StatRecordingType.manual,
      },
    ],
  },
  {
    name: StatCategories.BallHandling,
    stats: [
      {
        name: 'Attempt',
        commandNames: [ballHandlingArray],
        shorthand: 'BHA',
        calculator: getStatCount(['BHA']),
        result: StatResultTypes.nill,
        description: 'The total number of ball handling attempts.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Assist',
        shorthand: 'AST',
        calculator: getStatCount(['AST']),
        result: StatResultTypes.nill,
        description:
          'A player is awarded an assist whenever that player passes, sets or digs the ball to a teammate who attacks the ball for a kill.',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Error',
        commandNames: [ballHandlingArray, errorArray],
        shorthand: 'BHE',
        calculator: getStatCount(['BHE']),
        result: StatResultTypes.error,
        description:
          'A ball handling error is a call made by the referee that ends the play. Generally this is a double, lift, carry, etc.',
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
        description:
          'Total number of digs during the game (season). A dig is awarded when the player passed the ball that has been attacked by the opposition. When an attack is blocked back into the attacker\'s court, a pass of the blocked ball is NOT considered a dig. Passing a "free ball" (ie- a ball played over the net by an opponent simply attempting to "keep the ball in play" - not score a point) should NOT be recorded as a "dig".',
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Error',
        commandNames: [
          [
            ...flatten(
              digArray.map(dig => errorArray.map(error => dig + ' ' + error))
            ),
            'dig error',
            'take care',
            'figure',
            'daycare',
            'duke energy',
            'duke are',
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
        description:
          'Total number of dig errors during the game (season). A dig error is given when an attacked ball hits the floor within the area of the player or the player passes an attacked ball that cannot be controlled and returned to the opposing team.',
        recordingType: StatRecordingType.manual,
      },
    ],
  },
];

export default statDefinitions;
