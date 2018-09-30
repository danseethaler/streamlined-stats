import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {RootState} from '../../../../redux/reducers';
import {SetType} from '../../../../redux/redux.definitions';
import LeaderBoard from '../../../components/LeaderBoard';
import {Columns} from '../components';
import PlayerTimedStats from './PlayerTimedStats';

interface SetProps extends RouteComponentProps<any> {
  set: SetType;
  playerName?: string;
}

const ReviewSet = ({set, playerName}: SetProps) => (
  <Columns>
    <LeaderBoard sets={[set]} />
    <PlayerTimedStats set={set} playerName={playerName} />
  </Columns>
);

export default connect(
  ({sets}: RootState, {match}: RouteComponentProps<any>) => ({
    set: sets[match.params.setId],
    playerName: match.params.playerName,
  })
)(ReviewSet);
