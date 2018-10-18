import {StatTypes} from '../../../redux/redux.definitions';
import numberAlternates from '../numberAlternates';
import wordAlternates from '../wordAlternates';
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

const statDefinitions: StatCategoryType[] = [
  {
    name: StatCategories.General,
    stats: [
      {
        name: 'Sets Played',
        shorthand: 'SP',
        maxPrepsId: 'MatchGamesPlayed',
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
        commandNames: [wordAlternates.service, wordAlternates.attempt],
        maxPrepsId: 'TotalServes',
        shorthand: 'SA',
        calculator: getStatCount(['SA', 'A', 'SE']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Ace',
        commandNames: [wordAlternates.ace],
        maxPrepsId: 'ServingAces',
        shorthand: 'A',
        calculator: getStatCount(['A']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Service Error',
        commandNames: [wordAlternates.service, wordAlternates.error],
        maxPrepsId: 'ServingErrors',
        shorthand: 'SE',
        calculator: getStatCount(['SE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Service Rotation Points',
        shorthand: 'PTS',
        maxPrepsId: 'ServingPoints',
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
        commandNames: [wordAlternates.attempt],
        maxPrepsId: 'AttacksAttempts',
        shorthand: 'ATT',
        calculator: getStatCount(['ATT', 'K', 'E']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Kill',
        commandNames: [wordAlternates.kill],
        maxPrepsId: 'AttacksKills',
        shorthand: 'K',
        calculator: getStatCount(['K']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Attack Error',
        commandNames: [wordAlternates.error],
        maxPrepsId: 'AttacksErrors',
        shorthand: 'E',
        calculator: getStatCount(['E']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Freeball',
        commandNames: [wordAlternates.freeball],
        maxPrepsId: null,
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
        commandNames: [wordAlternates.receiving, numberAlternates[1]],
        maxPrepsId: 'ServingReceivedSuccess',
        shorthand: 'R1',
        calculator: getStatCount(['R1']),
        maxPrepsCalculator: getStatCount(['R1', 'R2', 'R3']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Receiving 2',
        commandNames: [wordAlternates.receiving, numberAlternates[2]],
        maxPrepsId: null,
        shorthand: 'R2',
        calculator: getStatCount(['R2']),
        maxPrepsCalculator: null,
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Receiving 3',
        commandNames: [wordAlternates.receiving, numberAlternates[3]],
        maxPrepsId: null,
        shorthand: 'R3',
        calculator: getStatCount(['R3']),
        maxPrepsCalculator: null,
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Receiving Error',
        commandNames: [wordAlternates.receiving, wordAlternates.error],
        maxPrepsId: 'ServingReceivedErrors',
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
        commandNames: [wordAlternates.block],
        maxPrepsId: 'BlocksSolo',
        shorthand: 'BS',
        calculator: getStatCount(['BS']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Assisted Block',
        shorthand: 'BA',
        commandNames: [wordAlternates.block, wordAlternates.assist],
        maxPrepsId: 'BlocksAssists',
        calculator: getStatCount(['BA']),
        result: StatResultTypes.point,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Blocking Error',
        commandNames: [wordAlternates.block, wordAlternates.error],
        maxPrepsId: 'BlocksErrors',
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
        commandNames: [wordAlternates.ballHandling],
        maxPrepsId: 'BallHandlingAttempt',
        shorthand: 'BHA',
        calculator: getStatCount(['BHA', 'AST', 'BHE']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Handling Assist',
        commandNames: [wordAlternates.ballHandling, wordAlternates.assist],
        maxPrepsId: 'Assists',
        shorthand: 'AST',
        calculator: getStatCount(['AST']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Handling Error',
        commandNames: [wordAlternates.ballHandling, wordAlternates.error],
        maxPrepsId: 'AssistsErrors',
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
        commandNames: [wordAlternates.dig],
        maxPrepsId: 'Digs',
        shorthand: 'D',
        calculator: getStatCount(['D']),
        result: StatResultTypes.nill,
        recordingType: StatRecordingType.manual,
      },
      {
        name: 'Dig Error',
        commandNames: [wordAlternates.digError],
        maxPrepsId: 'DigsErrors',
        shorthand: 'DE',
        calculator: getStatCount(['DE']),
        result: StatResultTypes.error,
        recordingType: StatRecordingType.manual,
      },
    ],
  },
];

export default statDefinitions;
