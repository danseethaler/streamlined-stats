import React from 'react';
import {connect} from 'react-redux';
import {arrayMove, SortableContainer} from 'react-sortable-hoc';
import {
  undoLastStatAction,
  updateStatsOrderAction,
} from '../../../../redux/actions/games';
import {GameRedux, StatType} from '../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../components/Button';
import {SortableStatItem} from '../components';
import {StatListContainer} from './components';

interface StatListProps {
  game: GameRedux;
  undoLastStat: (game: string) => void;
  updateStatsOrder: (game: string, stats: StatType[]) => void;
}

const StatListItems = ({items}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
    }}
  >
    {items.map((stat, index) => (
      <SortableStatItem key={index} index={index} {...stat} />
    ))}
  </div>
);

const SortableStatListItems = SortableContainer(StatListItems);

class StatList extends React.Component<StatListProps> {
  public onReorderStats = ({oldIndex, newIndex}) => {
    const orderedStats = arrayMove(this.props.game.stats, oldIndex, newIndex);

    this.props.updateStatsOrder(this.props.game.id, orderedStats);
  };

  public render() {
    const {game} = this.props;

    return (
      <StatListContainer>
        <Button
          type={ButtonTypes.danger}
          onClick={() => {
            this.props.undoLastStat(game.id);
          }}
        >
          Undo last stat
        </Button>
        <SortableStatListItems
          onSortEnd={this.onReorderStats}
          lockAxis="y"
          useDragHandle
          items={game.stats}
        />
      </StatListContainer>
    );
  }
}

export default connect(
  null,
  {
    undoLastStat: undoLastStatAction,
    updateStatsOrder: updateStatsOrderAction,
  }
)(StatList);
