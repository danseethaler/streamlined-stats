import React from 'react';
import {connect} from 'react-redux';
import stats from '../../../data/stats.json';
import {addStatAction} from '../../../redux/actions/games';

interface Stat {
  shorthand: string;
  player: string;
  game: string;
}

interface AddStatProps {
  game: string;
  player: string;
  onAddStat: () => void;
  addStat: (stat: Stat) => void;
}

class AddStat extends React.Component<AddStatProps> {
  public render() {
    return (
      <div>
        {stats.map(stat => (
          <button
            key={stat.shorthand}
            onClick={() => {
              this.props.addStat({
                shorthand: stat.shorthand,
                player: this.props.player,
                game: this.props.game,
              });
              this.props.onAddStat();
            }}
          >
            {stat.name}
          </button>
        ))}
      </div>
    );
  }
}

export default connect(
  null,
  {addStat: addStatAction}
)(AddStat);
