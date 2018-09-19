import React from 'react';
import {IoIosMic} from 'react-icons/io';
import {connect} from 'react-redux';
import {addStatAction} from '../../../redux/actions/games';
import {GameRedux, StatType, StatTypes} from '../../../redux/redux.definitions';
import {getPlayerCommandFromSpeech} from './commands';
import {Microphone} from './components';

const speechApiAvailabled = () => 'webkitSpeechRecognition' in window;

interface SpeechToTextProps {
  addPlayerStat: (game: string, stat: StatType) => void;
  game: GameRedux;
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
    } else {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 10;

      this.recognition.onstart = () => {
        this.setState({listening: true});
      };

      this.recognition.onerror = e => {
        console.log('errored', e);
        this.setState({listening: false});
      };

      this.recognition.onaudioend = e => {
        this.setState({listening: false});
      };

      // this.recognition.onend = e => {
      //   this.setState({listening: false});
      // };

      this.recognition.onresult = event => {
        const SpeechRecognitionResult = event.results[event.resultIndex];
        const results = [];
        for (let k = 0; k < SpeechRecognitionResult.length; k++) {
          results[k] = SpeechRecognitionResult[k].transcript
            .trim()
            .toLowerCase();
        }

        const playerCommand = getPlayerCommandFromSpeech(results);

        if (playerCommand) {
          this.props.addPlayerStat(this.props.game.id, {
            type: StatTypes.playerStat,
            player: playerCommand.player,
            shorthand: playerCommand.command,
          });
        }

        console.log('playerCommand', playerCommand);
      };

      window.addEventListener('keydown', e => {
        if ([13, 32].indexOf(e.keyCode) >= 0) {
          e.preventDefault();
          e.stopPropagation();
          if (!this.state.listening) {
            this.startSpeech();
          }
        }
      });

      window.addEventListener('keyup', e => {
        if ([13, 32].indexOf(e.keyCode) >= 0) {
          e.preventDefault();
          e.stopPropagation();
          if (this.state.listening) {
            this.stopSpeech();
          }
        }
      });
    }
  }

  public componentWillUnmount() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public startSpeech = () => {
    this.recognition.start();
  };

  public stopSpeech = () => {
    this.recognition.stop();
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
  {addPlayerStat: addStatAction}
)(SpeechToText);
