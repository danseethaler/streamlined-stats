import React from 'react';
import {IoIosMic} from 'react-icons/io';
import Button, {ButtonTypes} from '../../../components/Button';
import {TRANSITION_ALL} from '../../../components/constants';
import {
  ListenerStatuses,
  listeningColors,
  SpeechToTextChildProps,
} from '../../../components/SpeechToText';
import Spinner from '../../../components/Spinner';
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
      this.props.startListening();
    }
  };

  public handleKeyUp = e => {
    if ([13].indexOf(e.keyCode) >= 0) {
      e.preventDefault();
      e.stopPropagation();
      this.props.stopListening();
    }
  };

  public render() {
    const {listenerStatus, startListening, stopListening} = this.props;

    return (
      <Button
        onMouseDown={startListening}
        onMouseUp={stopListening}
        type={ButtonTypes.success}
        style={{
          padding: '13px 16px',
          transition: TRANSITION_ALL,
          backgroundColor: listeningColors[listenerStatus],
          color: colors.white,
          borderRadius: 96,
        }}
      >
        {listenerStatus === ListenerStatuses.processing ? (
          <Spinner />
        ) : (
          <IoIosMic size={64} color="#FFFFFF" />
        )}
      </Button>
    );
  }
}

export default Microphone;
