import {groupBy, map} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import stats, {StatCategoryActions} from '../../../data/stats';
import {addStatAction} from '../../../redux/actions/games';
import {
  PlayerStat,
  StatType,
  StatTypes,
} from '../../../redux/redux.definitions';
import {Headline6} from '../../components/Typography';

interface AddPlayerStatProps {
  game: string;
  player: string;
  onComplete: () => void;
  addPlayerStat: (game: string, stat: StatType) => void;
}

class AddPlayerStat extends React.Component<AddPlayerStatProps> {
  public render() {
    const categoryStats = groupBy(
      stats.filter(({action}) => action === StatCategoryActions.player),
      stat => stat.category
    );

    return (
      <div>
        {map(categoryStats, (categoryStatList, category) => (
          <div key={category} style={{marginBottom: '1em'}}>
            <Headline6>{category}</Headline6>
            {categoryStatList.map(stat => (
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
        ))}
      </div>
    );
  }
}

export default connect(
  null,
  {addPlayerStat: addStatAction}
)(AddPlayerStat);
