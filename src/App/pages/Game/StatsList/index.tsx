import React from 'react';
import {connect} from 'react-redux';
import {arrayMove, SortableContainer} from 'react-sortable-hoc';
import {
  undoLastStatAction,
  updateStatsOrderAction,
} from '../../../../redux/actions/games';
import {GameRedux, StatType} from '../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../components/Button';
import Modal from '../../../components/Modal';
import {SortableStatItem} from '../components';
import Substitute from '../GameActions/Substitute';
import {StatListContainer} from './components';

interface StatListProps {
  game: GameRedux;
  undoLastStat: (game: string) => void;
  updateStatsOrder: (game: string, stats: StatType[]) => void;
}

interface StatListState {
  subModalOpen: boolean;
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

class StatList extends React.Component<StatListProps, StatListState> {
  public state = {
    subModalOpen: false,
  };

  public onReorderStats = ({oldIndex, newIndex}) => {
    const orderedStats = arrayMove(this.props.game.stats, oldIndex, newIndex);

    this.props.updateStatsOrder(this.props.game.id, orderedStats);
  };

  public render() {
    const {game} = this.props;

    return (
      <StatListContainer>
        <div style={{display: 'flex'}}>
          <Button
            type={ButtonTypes.danger}
            onClick={() => {
              this.props.undoLastStat(game.id);
            }}
          >
            Undo stat
          </Button>
          {game.usingRotation && (
            <Button
              type={ButtonTypes.primary}
              onClick={() => {
                this.setState({subModalOpen: true});
              }}
            >
              Substitute
            </Button>
          )}
        </div>
        <SortableStatListItems
          onSortEnd={this.onReorderStats}
          lockAxis="y"
          useDragHandle
          items={game.stats}
        />
        <Modal
          pageSized
          open={this.state.subModalOpen}
          overlayClickCallback={() => {
            this.setState({subModalOpen: false});
          }}
          title="Substitute a player"
          content={
            <Substitute
              game={game}
              onComplete={() => {
                this.setState({subModalOpen: false});
              }}
            />
          }
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
