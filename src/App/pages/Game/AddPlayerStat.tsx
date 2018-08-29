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
import {colors} from '../../components/theme';
import {Headline5} from '../../components/Typography';
import {StatButton} from './components';

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
          <div key={category}>
            <Headline5
              style={{
                padding: '2px',
                backgroundColor: colors.darkCoolGray,
                color: colors.white,
              }}
            >
              {category}
            </Headline5>
            {categoryStatList.map(stat => (
              <StatButton
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
              </StatButton>
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
