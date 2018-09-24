import React from 'react';
import {IoIosMic} from 'react-icons/io';
import {connect} from 'react-redux';
import {
  addStatAction,
  toggleAdjustmentLastStatAction,
  undoLastStatAction,
} from '../../../redux/actions/sets';
import {SetType, StatType, StatTypes} from '../../../redux/redux.definitions';
import {getSpeechMatchCommands, VoiceCommandType} from './commands';
import {Microphone} from './components';

const speechApiAvailabled = () => 'webkitSpeechRecognition' in window;
let recognitionRunning = false;

interface SpeechToTextProps {
  addStat: (set: string, stat: StatType) => void;
  undoLastStat: (set: string) => void;
  toggleAdjustmentLastStat: (set: string) => void;
  set: SetType;
}

class SpeechToText extends React.Component<
  SpeechToTextProps,
  {
    listening: boolean;
  }
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
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

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

      const {set} = this.props;

      console.log('voiceCommand', voiceCommand);

      switch (voiceCommand.type) {
        case VoiceCommandType.playerStat:
          this.props.addStat(set.id, {
            type: StatTypes.playerStat,
            player: voiceCommand.player,
            shorthand: voiceCommand.shorthand,
          });
          break;

        case VoiceCommandType.pointAdjustment:
          this.props.addStat(set.id, {
            type: StatTypes.pointAdjustment,
            team: voiceCommand.team,
          });
          break;

        case VoiceCommandType.timeout:
          this.props.addStat(set.id, {
            type: StatTypes.timeout,
            team: voiceCommand.team,
          });
          break;

        case VoiceCommandType.undo:
          this.props.undoLastStat(set.id);
          break;

        case VoiceCommandType.adjustment:
          this.props.toggleAdjustmentLastStat(set.id);
          break;

        default:
          break;
      }
    };
  }

  public handleKeyDown = e => {
    if ([13].indexOf(e.keyCode) >= 0) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.listening) {
        this.startSpeech();
      }
    }
  };

  public handleKeyUp = e => {
    if ([13].indexOf(e.keyCode) >= 0) {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.listening) {
        this.stopSpeech();
      }
    }
  };

  public componentWillUnmount() {
    if (this.recognition) {
      this.recognition.stop();
    }

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  public startSpeech = () => {
    if (!recognitionRunning) {
      this.recognition.start();
    }
  };

  public stopSpeech = () => {
    if (recognitionRunning) {
      this.recognition.stop();
    }
  };

  public render() {
    if (!speechApiAvailabled()) {
      return null;
    }

    return (
      <Microphone
        active={this.state.listening}
        onMouseDown={() => {
          this.startSpeech();
        }}
        onMouseUp={() => {
          this.stopSpeech();
        }}
      >
        <IoIosMic size={32} color="#FFFFFF" />
      </Microphone>
    );
  }
}

export default connect(
  null,
  {
    addStat: addStatAction,
    undoLastStat: undoLastStatAction,
    toggleAdjustmentLastStat: toggleAdjustmentLastStatAction,
  }
)(SpeechToText);
