import React from 'react';
import {connect} from 'react-redux';
import {IoIosMic} from 'react-icons/io';
import {addStatAction} from '../../../redux/actions/games';
import {GameRedux, StatType, StatTypes} from '../../../redux/redux.definitions';
import {getPlayerCommandFromSpeech} from './commands';
import {Microphone} from './components';

interface SpeechToTextProps {
  addPlayerStat: (game: string, stat: StatType, insertBefore?: boolean) => void;
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
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Web Speech API is not supported on this browser.');
    } else {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 10;

      this.recognition.onstart = () => {
        console.log('started');
        this.setState({listening: true});
      };

      this.recognition.onerror = e => {
        console.log('errored', e);
        this.setState({listening: false});
        setTimeout(this.startSpeech);
      };

      this.recognition.onend = e => {
        console.log('ended');
        this.setState({listening: false});
      };

      this.recognition.onresult = event => {
        this.stopSpeech();

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
        setTimeout(this.startSpeech);
      };
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
    return (
      <Microphone
        active={this.state.listening}
        onClick={() => {
          if (this.state.listening) {
            this.stopSpeech();
          } else {
            this.startSpeech();
          }
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
