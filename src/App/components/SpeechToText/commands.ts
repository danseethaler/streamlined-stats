import {flatten} from 'lodash';
import {UsOrOpponent} from '../../../redux/redux.definitions';
import players from '../../services/players';
import {getFlatStatDefinitions} from '../../services/stats/categories';
import {getJerseyVoiceAlternatives} from './services';

export const enum VoiceCommandType {
  substitute = 'substitute',
  timeout = 'timeout',
  playerStat = 'playerStat',
  pointAdjustment = 'pointAdjustment',
  undo = 'undo',
  adjustment = 'adjustment',
}

interface VoiceCommands {
  type: VoiceCommandType;
  regex: string;
  shorthand?: string;
  player?: string;
  team?: UsOrOpponent;
}

export const getCommands = (): VoiceCommands[] => {
  // TODO: Remove alternateNames once jersey numbers prove effective
  const playerGroupings = players.map(({name, jersey, alternateNames}) => ({
    player: name,
    regex:
      '(' +
      [...getJerseyVoiceAlternatives(jersey), ...alternateNames].join('|') +
      ')',
  }));

  const commandGroupings = getFlatStatDefinitions(true)
    .filter(({commandNames}) => commandNames)
    .map(stat => ({
      shorthand: stat.shorthand,
      regex:
        '(' + stat.commandNames.map(group => group.join('|')).join(') (') + ')',
    }));

  const playerCommands = commandGroupings.map(commandGrouping =>
    playerGroupings.map(playerGroup => ({
      type: VoiceCommandType.playerStat,
      regex: `^${playerGroup.regex} ${commandGrouping.regex}$`,
      shorthand: commandGrouping.shorthand,
      player: playerGroup.player,
    }))
  );

  const otherCommands = [
    {
      type: VoiceCommandType.pointAdjustment,
      regex: `^(add point|add points|adding points)$`,
      team: UsOrOpponent.us,
    },
    {
      type: VoiceCommandType.pointAdjustment,
      regex: `^(add point opponent|add points opponent|add point opponents)$`,
      team: UsOrOpponent.opponent,
    },
    {
      type: VoiceCommandType.timeout,
      regex: `^timeout$`,
      team: UsOrOpponent.us,
    },
    {
      type: VoiceCommandType.timeout,
      regex: `^timeout opponent$`,
      team: UsOrOpponent.opponent,
    },
    {
      type: VoiceCommandType.undo,
      regex: `^(undo|cancel|remove|delete)$`,
      team: UsOrOpponent.opponent,
    },
    {
      type: VoiceCommandType.adjustment,
      regex: `^(adjustment|adjustments|address book)$`,
    },
  ];

  return [...flatten(playerCommands), ...otherCommands];
};

const commands = getCommands();

export const getSpeechMatchCommands = results => {
  console.log(JSON.stringify(results, null, 4));

  return (
    commands.find(({regex}) =>
      results.find(result => new RegExp(regex, 'i').test(result))
    ) || null
  );
};
