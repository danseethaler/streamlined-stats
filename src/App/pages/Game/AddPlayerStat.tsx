import React from 'react';
import {connect} from 'react-redux';
import stats, {StatCategoryType} from '../../../data/stats';
import {addStatAction} from '../../../redux/actions/games';
import {
  PlayerStat,
  StatType,
  StatTypes,
} from '../../../redux/redux.definitions';

interface AddPlayerStatProps {
  game: string;
  player: string;
  onComplete: () => void;
  addPlayerStat: (game: string, stat: StatType) => void;
}

class AddPlayerStat extends React.Component<AddPlayerStatProps> {
  public render() {
    return (
      <div>
        {stats.map(stat => (
          <button
            key={stat.shorthand}
            onClick={() => {
              const playerStat: PlayerStat = {
                type: StatTypes.playerStat,
                shorthand: stat.shorthand,
                player: this.props.player,
              };
              this.props.addPlayerStat(this.props.game, playerStat);
              this.props.onComplete();
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
  {addPlayerStat: addStatAction}
)(AddPlayerStat);
