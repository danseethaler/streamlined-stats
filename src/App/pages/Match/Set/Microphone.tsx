import React from 'react';
import Button, {ButtonTypes} from '../../../components/Button';
import {SpeechToTextChildProps} from '../../../components/SpeechToText';
import {colors} from '../../../components/theme';

class Microphone extends React.Component<SpeechToTextChildProps> {
  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  public handleKeyDown = e => {
    if ([13].indexOf(e.keyCode) >= 0) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.props.listening) {
        this.props.startListening();
      }
    }
  };

  public handleKeyUp = e => {
    if ([13].indexOf(e.keyCode) >= 0) {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.listening) {
        this.props.stopListening();
      }
    }
  };

  public render() {
    const {listening, startListening, stopListening, children} = this.props;

    return (
      <Button
        onMouseDown={startListening}
        onMouseUp={stopListening}
        type={ButtonTypes.success}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          padding: '13px 16px',
          backgroundColor: listening
            ? colors.purple
            : colors.extraLightCoolGray,
          color: colors.white,
          borderRadius: 48,
        }}
      >
        {children}
      </Button>
    );
  }
}

export default Microphone;
