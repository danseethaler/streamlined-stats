import React from 'react';
import {StatTypes} from '../../../redux/redux.definitions';
import {getSpeechMatchCommands, VoiceCommandType} from './commands';

const speechApiAvailabled = () => 'webkitSpeechRecognition' in window;
let recognitionRunning = false;

export interface SpeechToTextChildProps {
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
}

interface SpeechToTextProps {
  onCommand: (command: any) => void;
  children: React.SFC<SpeechToTextChildProps>;
}

interface SpeechToTextState {
  listening: boolean;
}

class SpeechToText extends React.Component<
  SpeechToTextProps,
  SpeechToTextState
> {
  public state = {
    listening: false,
  };

  private recognition: any;

  public componentDidMount() {
    if (!speechApiAvailabled()) {
      console.log('Web Speech API is not supported on this browser.');
      return;
    }

    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 10;

    this.recognition.onstart = () => {
      recognitionRunning = true;
      this.setState({listening: true});
    };

    this.recognition.onerror = e => {
      recognitionRunning = false;
      console.log('errored', e);
      this.setState({listening: false});
    };

    this.recognition.onaudioend = e => {
      this.setState({listening: false});
    };

    this.recognition.onend = e => {
      recognitionRunning = false;
      // this.setState({listening: false});
    };

    this.recognition.onresult = event => {
      const SpeechRecognitionResult = event.results[event.resultIndex];
      const results = [];
      for (let k = 0; k < SpeechRecognitionResult.length; k++) {
        results[k] = SpeechRecognitionResult[k].transcript.trim().toLowerCase();
      }

      const voiceCommand = getSpeechMatchCommands(results);

      if (!voiceCommand) {
        console.warn('No match!');
        return;
      }

      console.log('voiceCommand', voiceCommand);

      switch (voiceCommand.type) {
        case VoiceCommandType.undo:
          this.props.onCommand({
            type: VoiceCommandType.undo,
          });
          break;

        case VoiceCommandType.adjustment:
          this.props.onCommand({
            type: VoiceCommandType.adjustment,
          });
          break;

        case VoiceCommandType.playerStat:
          this.props.onCommand({
            type: StatTypes.playerStat,
            player: voiceCommand.player,
            shorthand: voiceCommand.shorthand,
          });
          break;

        case VoiceCommandType.pointAdjustment:
          this.props.onCommand({
            type: StatTypes.pointAdjustment,
            team: voiceCommand.team,
          });
          break;

        case VoiceCommandType.timeout:
          this.props.onCommand({
            type: StatTypes.timeout,
            team: voiceCommand.team,
          });
          break;

        case VoiceCommandType.noMatch:
          this.props.onCommand({
            type: StatTypes.noMatch,
            results: voiceCommand.results,
          });
          break;

        default:
          break;
      }
    };
  }

  public componentWillUnmount() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public startListening = () => {
    if (!recognitionRunning) {
      this.recognition.start();
    }
  };

  public stopListening = () => {
    if (recognitionRunning) {
      this.recognition.stop();
    }
  };

  public render() {
    if (!speechApiAvailabled()) {
      return null;
    }

    return this.props.children({
      listening: this.state.listening,
      startListening: this.startListening,
      stopListening: this.stopListening,
    });
  }
}

export default SpeechToText;
