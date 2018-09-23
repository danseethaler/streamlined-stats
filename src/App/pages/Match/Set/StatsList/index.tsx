import React from 'react';
import {connect} from 'react-redux';
import {updateStatsOrderAction} from '../../../../../redux/actions/sets';
import {StatType} from '../../../../../redux/redux.definitions';
import {StatItem, StatListContainer} from './components';

interface StatListProps {
  stats: StatType[];
  updateStatsOrder: (setId: string, stats: StatType[]) => void;
}

class StatList extends React.Component<StatListProps> {
  public render() {
    const {stats} = this.props;

    return (
      <StatListContainer>
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </StatListContainer>
    );
  }
}

export default connect(
  null,
  {
    updateStatsOrder: updateStatsOrderAction,
  }
)(StatList);
