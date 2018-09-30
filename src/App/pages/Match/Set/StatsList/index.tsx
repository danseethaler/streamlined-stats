import React from 'react';
import {SetType} from '../../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../../components/Button';
import {colors} from '../../../../components/theme';
import {Monospace, Paragraph2} from '../../../../components/Typography';
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
            <StatItem key={index} setId={set.id} index={index} stat={stat} />
          ))}
        {set.stats.length === 0 && (
          <Paragraph2 style={{color: colors.lightGray, marginTop: 20}}>
            Hit <Monospace>enter</Monospace> to begin recording
          </Paragraph2>
        )}
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
