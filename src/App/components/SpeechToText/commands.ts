import {flatten} from 'lodash';
import {UsOrOpponent} from '../../../redux/redux.definitions';
import players from '../../services/players';
import {getFlatStatDefinitions} from '../../services/stats/categories';
import {getJerseyVoiceAlternatives} from './services';

export const enum VoiceCommandType {
  timeout = 'timeout',
  playerStat = 'playerStat',
  pointAdjustment = 'pointAdjustment',
  remove = 'remove',
  adjustment = 'adjustment',
  noMatch = 'noMatch',
  clearAll = 'clearAll',
}

interface VoiceCommand {
  type: VoiceCommandType;
  regex?: string;
  shorthand?: string;
  player?: string;
  team?: UsOrOpponent;
  results?: string[];
}

export const getCommands = (): VoiceCommand[] => {
  const playerGroupings = players.map(({name, jersey}) => ({
    player: name,
    regex: '(' + getJerseyVoiceAlternatives(jersey).join('|') + ')',
  }));

  const commandGroupings = getFlatStatDefinitions(true)
    .filter(({commandNames}) => commandNames)
    .map(stat => ({
      shorthand: stat.shorthand,
      regex:
        '(' +
        stat.commandNames.map(group => group.join('|')).join(') *(') +
        ')',
    }));

  const playerCommands = commandGroupings.map(commandGrouping =>
    playerGroupings.map(playerGroup => ({
      type: VoiceCommandType.playerStat,
      regex: `^${playerGroup.regex} *${commandGrouping.regex}$`,
      shorthand: commandGrouping.shorthand,
      player: playerGroup.player,
    }))
  );

  const otherCommands = [
    {
      type: VoiceCommandType.pointAdjustment,
      regex: `^(add point|add points|adding points|opponent error)$`,
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
      type: VoiceCommandType.remove,
      regex: `^(undo|cancel|remove|delete)$`,
      team: UsOrOpponent.opponent,
    },
    {
      type: VoiceCommandType.clearAll,
      regex: `^clear all stats$`,
    },
    {
      type: VoiceCommandType.adjustment,
      regex: `^(adjustment|adjustments|address book)$`,
    },
  ];

  return [...flatten(playerCommands), ...otherCommands];
};

const commands = getCommands();

export const getSpeechMatchCommands = (results): VoiceCommand => {
  let command;

  for (let index = 0; index < results.length; index++) {
    command = commands.find(({regex}) =>
      new RegExp(regex, 'i').test(results[index])
    );

    if (command) {
      return {...command, ...{regex: undefined}};
    }
  }

  return {
    type: VoiceCommandType.noMatch,
    results,
  };
};
