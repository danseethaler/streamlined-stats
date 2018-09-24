import React from 'react';
import {IoIosMic} from 'react-icons/io';
import {connect} from 'react-redux';
import {
  addStatAction,
  removeStatAction,
  toggleStatAdjustmentAction,
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
  removeStat: (set: string, index: number) => void;
  toggleStatAdjustment: (set: string, index: number) => void;
}

class Set extends React.Component<SetProps> {
  public handleCommand = command => {
    switch (command.type) {
      case VoiceCommandType.remove:
        return this.props.removeStat(this.props.set.id, 0);

      case VoiceCommandType.adjustment:
        return this.props.toggleStatAdjustment(this.props.set.id, 0);

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
    removeStat: removeStatAction,
    toggleStatAdjustment: toggleStatAdjustmentAction,
  }
)(Set);
