import React from 'react';
import {connect} from 'react-redux';
import {updateStatsOrderAction} from '../../../../../redux/actions/sets';
import {StatType} from '../../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../../components/Button';
import {Headline3} from '../../../../components/Typography';
import {StatItem, StatListContainer} from './components';

interface StatListProps {
  stats: StatType[];
  updateStatsOrder: (setId: string, stats: StatType[]) => void;
}

interface StatListState {
  showAll: boolean;
}

class StatList extends React.Component<StatListProps, StatListState> {
  public state = {
    showAll: false,
  };

  public render() {
    const {stats} = this.props;

    return (
      <StatListContainer>
        {stats.slice(0, this.state.showAll ? 1000 : 10).map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
        {stats.length === 0 && <Headline3>Add a stat</Headline3>}
        {stats.length > 10 && (
          <Button
            type={ButtonTypes.accent}
            onClick={() => {
              this.setState({showAll: !this.state.showAll});
            }}
          >
            Toggle All
          </Button>
        )}
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
