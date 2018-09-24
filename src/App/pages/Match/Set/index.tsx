import React from 'react';
import {IoIosMic} from 'react-icons/io';
import {connect} from 'react-redux';
import {
  addStatAction,
  toggleAdjustmentLastStatAction,
  undoLastStatAction,
} from '../../../../redux/actions/sets';
import {RootState} from '../../../../redux/reducers';
import {SetType, StatType} from '../../../../redux/redux.definitions';
import SpeechToText from '../../../components/SpeechToText';
import {VoiceCommandType} from '../../../components/SpeechToText/commands';
import Microphone from './Microphone';
import StatsList from './StatsList';

interface SetProps {
  set: SetType;
  addStat: (set: string, stat: StatType) => void;
  undoLastStat: (set: string) => void;
  toggleAdjustmentLastStat: (set: string) => void;
}

class Set extends React.Component<SetProps> {
  public handleCommand = command => {
    console.log('command', command);

    switch (command.type) {
      case VoiceCommandType.undo:
        return this.props.undoLastStat(this.props.set.id);

      case VoiceCommandType.adjustment:
        return this.props.toggleAdjustmentLastStat(this.props.set.id);

      default:
        return this.props.addStat(this.props.set.id, command);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <StatsList set={this.props.set} />
        <SpeechToText onCommand={this.handleCommand}>
          {props => (
            <Microphone {...props}>
              <IoIosMic size={32} color="#FFFFFF" />
            </Microphone>
          )}
        </SpeechToText>
      </React.Fragment>
    );
  }
}

export default connect(
  ({sets}: RootState, {setId}: {setId: string}) => ({
    set: sets[setId],
  }),
  {
    addStat: addStatAction,
    undoLastStat: undoLastStatAction,
    toggleAdjustmentLastStat: toggleAdjustmentLastStatAction,
  }
)(Set);
