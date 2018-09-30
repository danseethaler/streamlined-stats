import React from 'react';
import {StatTypes} from '../../../redux/redux.definitions';
import {colors} from '../theme';
import {getSpeechMatchCommands, VoiceCommandType} from './commands';
import {recordAudio} from './services';

const speechApiAvailabled = () => 'webkitSpeechRecognition' in window;

export const enum ListenerStatuses {
  listening = 'listening',
  processing = 'processing',
  ready = 'ready',
}

export interface SpeechToTextChildProps {
  listenerStatus: ListenerStatuses;
  startListening: () => void;
  stopListening: () => void;
}

export const listeningColors = {
  [ListenerStatuses.ready]: colors.gray,
  [ListenerStatuses.listening]: colors.primary,
  [ListenerStatuses.processing]: colors.affirmative,
};

interface SpeechToTextProps {
  onCommand: (command: any) => void;
  children: React.SFC<SpeechToTextChildProps>;
}

interface SpeechToTextState {
  listenerStatus: ListenerStatuses;
  audioUrl: string;
}

class SpeechToText extends React.Component<
  SpeechToTextProps,
  SpeechToTextState
> {
  public state = {
    listenerStatus: ListenerStatuses.ready,
    audioUrl: '',
  };

  private recognition: any;
  private audioRecording: any;

  public async componentDidMount() {
    if (!speechApiAvailabled()) {
      console.log('Web Speech API is not supported on this browser.');
      return;
    }

    this.audioRecording = await recordAudio();
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 10;

    this.recognition.onstart = async () => {
      this.setState({listenerStatus: ListenerStatuses.listening, audioUrl: ''});
      this.audioRecording.start();
    };

    this.recognition.onaudioend = async () => {
      this.setState({listenerStatus: ListenerStatuses.processing});
      const audioUrl = await this.audioRecording.stop();
      this.setState({audioUrl});
    };

    this.recognition.onend = () => {
      this.setState({listenerStatus: ListenerStatuses.ready});
    };

    this.recognition.onerror = e => {
      console.log('errored', e);
      this.setState({listenerStatus: ListenerStatuses.ready});
    };

    this.recognition.onresult = event => {
      const SpeechRecognitionResult = event.results[event.resultIndex];
      const results = [];
      for (let k = 0; k < SpeechRecognitionResult.length; k++) {
        results[k] = SpeechRecognitionResult[k].transcript.trim().toLowerCase();
      }

      console.log(JSON.stringify(results, null, 4));

      const voiceCommand = getSpeechMatchCommands(results);

      console.log(JSON.stringify(voiceCommand, null, 4));

      console.log('\n------------------\n');

      switch (voiceCommand.type) {
        case VoiceCommandType.remove:
          this.props.onCommand({
            type: VoiceCommandType.remove,
          });
          break;

        case VoiceCommandType.clearAll:
          this.props.onCommand({
            type: VoiceCommandType.clearAll,
          });
          break;

        case VoiceCommandType.adjustment:
          this.props.onCommand({
            type: VoiceCommandType.adjustment,
            audioUrl: this.state.audioUrl,
          });
          break;

        case VoiceCommandType.playerStat:
          this.props.onCommand({
            type: StatTypes.playerStat,
            audioUrl: this.state.audioUrl,
            player: voiceCommand.player,
            shorthand: voiceCommand.shorthand,
          });
          break;

        case VoiceCommandType.pointAdjustment:
          this.props.onCommand({
            type: StatTypes.pointAdjustment,
            audioUrl: this.state.audioUrl,
            team: voiceCommand.team,
          });
          break;

        case VoiceCommandType.timeout:
          this.props.onCommand({
            type: StatTypes.timeout,
            audioUrl: this.state.audioUrl,
            team: voiceCommand.team,
          });
          break;

        case VoiceCommandType.noMatch:
          this.props.onCommand({
            type: StatTypes.noMatch,
            audioUrl: this.state.audioUrl,
            results: voiceCommand.results,
          });
          break;
      }
    };
  }

  public componentWillUnmount() {
    if (this.recognition) {
      this.recognition.onstart = null;
      this.recognition.onaudioend = null;
      this.recognition.onend = null;
      this.recognition.onerror = null;
      this.recognition.onresult = null;

      this.recognition.stop();
    }
  }

  public startListening = () => {
    if (this.state.listenerStatus === ListenerStatuses.ready) {
      this.recognition.start();
    }
  };

  public stopListening = () => {
    if (this.state.listenerStatus === ListenerStatuses.listening) {
      this.recognition.stop();
    }
  };

  public render() {
    if (!speechApiAvailabled()) {
      return null;
    }

    return this.props.children({
      listenerStatus: this.state.listenerStatus,
      startListening: this.startListening,
      stopListening: this.stopListening,
    });
  }
}

export default SpeechToText;
