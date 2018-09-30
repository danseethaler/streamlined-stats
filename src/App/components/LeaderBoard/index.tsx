import React from 'react';
import {SetType} from '../../../redux/redux.definitions';

interface LeaderBoardProps {
  sets: SetType[];
}

class LeaderBoard extends React.Component<LeaderBoardProps> {
  public render() {
    return <div>LeaderBoard for {this.props.sets.length} sets</div>;
  }
}

export default LeaderBoard;
