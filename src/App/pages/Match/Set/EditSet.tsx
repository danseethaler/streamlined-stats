import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {
  addStatAction,
  clearStatsAction,
  removeStatAction,
  toggleStatAdjustmentAction,
} from '../../../../redux/actions/sets';
import {RootState} from '../../../../redux/reducers';
import {SetType, StatType} from '../../../../redux/redux.definitions';
import SpeechToText from '../../../components/SpeechToText';
import {VoiceCommandType} from '../../../components/SpeechToText/commands';
import {Columns} from '../components';
import {RecordStatsContainer} from './components';
import Microphone from './Microphone';
import RecordingStart from './RecordingStart';
import StatsList from './StatsList';

interface SetProps extends RouteComponentProps<any> {
  set: SetType;
  playerName?: string;
  addStat: (setId: string, stat: StatType) => void;
  removeStat: (setId: string, index: number) => void;
  clearStats: (setId: string) => void;
  toggleStatAdjustment: (set: string, index: number) => void;
}

class Set extends React.Component<SetProps> {
  public handleCommand = command => {
    switch (command.type) {
      case VoiceCommandType.remove:
        return this.props.removeStat(this.props.set.id, 0);

      case VoiceCommandType.clearAll:
        return this.props.clearStats(this.props.set.id);

      case VoiceCommandType.adjustment:
        return this.props.toggleStatAdjustment(this.props.set.id, 0);

      default:
        return this.props.addStat(this.props.set.id, command);
    }
  };

  public render() {
    const {set} = this.props;

    return (
      <Columns>
        <RecordingStart set={set} />

        <RecordStatsContainer>
          <SpeechToText onCommand={this.handleCommand}>
            {props => <Microphone {...props} />}
          </SpeechToText>
          <StatsList set={set} />
        </RecordStatsContainer>
      </Columns>
    );
  }
}

export default connect(
  ({sets}: RootState, {match}: RouteComponentProps<any>) => ({
    set: sets[match.params.setId],
  }),
  {
    addStat: addStatAction,
    removeStat: removeStatAction,
    clearStats: clearStatsAction,
    toggleStatAdjustment: toggleStatAdjustmentAction,
  }
)(Set);
