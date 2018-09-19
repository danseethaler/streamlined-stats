import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {connect} from 'react-redux';
import {arrayMove, SortableContainer} from 'react-sortable-hoc';
import {
  undoLastStatAction,
  updateStatsOrderAction,
} from '../../../../redux/actions/games';
import {GameRedux, StatType} from '../../../../redux/redux.definitions';
import ButtonNew from '../../../components/ButtonNew';
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
        <div style={{display: 'flex'}}>
          <ButtonNew
            icon={IoIosArrowBack}
            text="Undo stat"
            onClick={() => {
              this.props.undoLastStat(game.id);
            }}
          />
        </div>
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
