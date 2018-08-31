import React from 'react';
import {connect} from 'react-redux';
import {arrayMove} from 'react-sortable-hoc';
import {undoLastStatAction} from '../../../../redux/actions/games';
import {GameRedux} from '../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../components/Button';
import {SortableStatItem} from '../components';

interface StatListProps {
  game: GameRedux;
  undoLastStat: (game: string) => void;
}

const StatListItems = ({game}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column-reverse',
    }}
  >
    {game.stats.map((stat, index) => (
      <SortableStatItem key={index} index={index} {...stat} />
    ))}
  </div>
);

class StatList extends React.Component<StatListProps> {
  public onReorderStats = ({oldIndex, newIndex}) => {
    const orderedStats = arrayMove(this.props.game.stats, oldIndex, newIndex);

    console.log(JSON.stringify(orderedStats, null, 4));
  };

  public render() {
    const {game} = this.props;

    return (
      <div>
        <Button
          type={ButtonTypes.danger}
          onClick={() => {
            this.props.undoLastStat(game.id);
          }}
        >
          Undo last stat
        </Button>
        <StatListItems game={game} />
      </div>
    );
  }
}

export default connect(
  null,
  {
    undoLastStat: undoLastStatAction,
  }
)(StatList);
