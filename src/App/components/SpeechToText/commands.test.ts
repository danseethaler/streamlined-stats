import {getSpeechMatchCommands} from './commands';

describe('getSpeechMatchCommands', () => {
  test('should use first result', () => {
    const results = ['15 error', '14 error'];
    const command = getSpeechMatchCommands(results);

    expect(command.player).toBe('Hannah');
  });
});
