import {findKey} from 'lodash';
import players from '../../services/players';
import {getFlatStatDefinitions} from '../../services/stats/categories';

export const getCommands = () => {
  const playerGroupings = players.map(({name, alternateNames}) => ({
    key: name,
    regex: '(' + alternateNames.join('|') + ')',
  }));

  const commandGroupings = getFlatStatDefinitions(true)
    .filter(({commandNames}) => commandNames)
    .map(stat => ({
      key: stat.shorthand,
      regex:
        '(' + stat.commandNames.map(group => group.join('|')).join(') (') + ')',
    }));

  return commandGroupings.reduce((combinedCommands, commandGrouping) => {
    playerGroupings.forEach(playerGroup => {
      combinedCommands[commandGrouping.key + '_' + playerGroup.key] = `^${
        playerGroup.regex
      } ${commandGrouping.regex}$`;
    });
    return combinedCommands;
  }, {});
};

const commands = getCommands();

export const getPlayerCommandFromSpeech = results => {
  console.log(JSON.stringify(results, null, 4));

  const playerCommand = findKey(commands, commandRegex =>
    results.find(result => new RegExp(commandRegex, 'i').test(result))
  );

  if (!playerCommand) {
    return null;
  }

  const [command, player] = playerCommand.split('_');
  return {command, player};
};
