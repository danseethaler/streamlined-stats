import React from 'react';
import {SetType} from '../../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../../components/Button';
import {Headline3} from '../../../../components/Typography';
import {StatItem, StatListContainer} from './components';

interface StatListProps {
  set: SetType;
}

interface StatListState {
  showAll: boolean;
}

class StatList extends React.Component<StatListProps, StatListState> {
  public state = {
    showAll: false,
  };

  public render() {
    const {set} = this.props;

    return (
      <StatListContainer>
        {set.stats
          .slice(0, this.state.showAll ? 1000 : 10)
          .map((stat, index) => (
            <StatItem key={stat['id']} setId={set.id} index={index} {...stat} />
          ))}
        {set.stats.length === 0 && <Headline3>Add a stat</Headline3>}
        {set.stats.length > 10 && (
          <Button
            type={ButtonTypes.accent}
            onClick={() => {
              this.setState({showAll: !this.state.showAll});
            }}
          >
            {this.state.showAll ? 'Hide older stats' : 'Show all stats'}
          </Button>
        )}
      </StatListContainer>
    );
  }
}

export default StatList;
