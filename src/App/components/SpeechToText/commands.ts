import {flatten} from 'lodash';
import players from '../../services/players';
import {getFlatStatDefinitions} from '../../services/stats/categories';
import {StatTypes, UsOrOpponent} from '../../../redux/redux.definitions';

interface VoiceCommands {
  type: StatTypes;
  regex: string;
  shorthand?: string;
  player?: string;
  team?: UsOrOpponent;
}

export const getCommands = (): VoiceCommands[] => {
  // TODO: Remove alternateNames once jersey numbers prove effective
  const playerGroupings = players.map(({name, jersey, alternateNames}) => ({
    player: name,
    regex: '(' + [...jersey, ...alternateNames].join('|') + ')',
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
      type: StatTypes.playerStat,
      regex: `^${playerGroup.regex} ${commandGrouping.regex}$`,
      shorthand: commandGrouping.shorthand,
      player: playerGroup.player,
    }))
  );

  const otherCommands = [
    {
      type: StatTypes.pointAdjustment,
      regex: `^add point$`,
      team: UsOrOpponent.us,
    },
    {
      type: StatTypes.pointAdjustment,
      regex: `^add point opponent$`,
      team: UsOrOpponent.opponent,
    },
    {
      type: StatTypes.timeout,
      regex: `^timeout$`,
      team: UsOrOpponent.us,
    },
    {
      type: StatTypes.timeout,
      regex: `^timeout opponent$`,
      team: UsOrOpponent.opponent,
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
