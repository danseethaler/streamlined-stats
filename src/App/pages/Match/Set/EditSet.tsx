import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {
  addStatAction,
  clearStatsAction,
  removeStatAction,
  toggleStatFlagAction,
} from '../../../../redux/actions/sets';
import {RootState} from '../../../../redux/reducers';
import {SetType, StatType} from '../../../../redux/redux.definitions';
import SpeechToText from '../../../components/SpeechToText';
import {VoiceCommandType} from '../../../components/SpeechToText/commands';
import players from '../../../services/players';
import statDefinitions from '../../../services/stats/stats';
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
  toggleStatFlag: (
    set: string,
    index: number,
    flag: 'adjustment' | 'review'
  ) => void;
}

class Set extends React.Component<SetProps> {
  public handleCommand = command => {
    switch (command.type) {
      case VoiceCommandType.remove:
        return this.props.removeStat(this.props.set.id, 0);

      case VoiceCommandType.clearAll:
        return this.props.clearStats(this.props.set.id);

      case VoiceCommandType.adjustment:
        return this.props.toggleStatFlag(this.props.set.id, 0, 'adjustment');

      case VoiceCommandType.review:
        return this.props.toggleStatFlag(this.props.set.id, 0, 'review');

      default:
        return this.props.addStat(this.props.set.id, command);
    }
  };

  public render() {
    const {set} = this.props;

    return (
      <Columns>
        <RecordStatsContainer>
          <RecordingStart set={set} />

          <table>
            <tbody>
              {players.map(player => (
                <tr key={player.name}>
                  <td style={{textAlign: 'right'}}>
                    <b>{player.jersey.join('/')}</b>
                  </td>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RecordStatsContainer>
        <RecordStatsContainer style={{flex: 1}}>
          <table>
            <tbody>
              {statDefinitions.map(statGroup => (
                <React.Fragment key={statGroup.name}>
                  <tr>
                    <th style={{textAlign: 'left'}}>
                      <b>{statGroup.name}</b>
                    </th>
                  </tr>
                  {statGroup.stats.map(stat => (
                    <tr key={stat.name}>
                      <td>{stat.name}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </RecordStatsContainer>

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
    toggleStatFlag: toggleStatFlagAction,
  }
)(Set);
