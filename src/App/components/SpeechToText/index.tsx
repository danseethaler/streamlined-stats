import React from 'react';
import {Microphone} from './components';

class SpeechToText extends React.Component<
  {
    handleCommand: (speech: string) => void;
  },
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

      this.recognition.onstart = () => {
        console.log('onstart');
      };

      this.recognition.onerror = () => {
        console.log('onerror');
      };

      this.recognition.onend = () => {
        console.log('onend');
      };

      this.recognition.onresult = event => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            this.props.handleCommand(finalTranscript);
          } else {
            console.log('interum', event.results[i][0].transcript);
          }
        }
        // final_span.innerHTML = linebreak(finalTranscript);
      };
    }
  }

  public componentWillUnmount() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public startSpeech = () => {
    this.setState({listening: true});
    this.recognition.start();
  };

  public stopSpeech = () => {
    this.setState({listening: false});
    this.recognition.stop();
  };

  public render() {
    return (
      <Microphone
        onClick={() => {
          if (this.state.listening) {
            this.stopSpeech();
          } else {
            this.startSpeech();
          }
        }}
      >
        {this.state.listening ? 'Stop' : 'Start'}
      </Microphone>
    );
  }
}

export default SpeechToText;
