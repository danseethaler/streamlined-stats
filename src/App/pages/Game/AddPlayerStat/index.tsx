import React from 'react';
import {connect} from 'react-redux';
import {addStatAction} from '../../../../redux/actions/games';
import {
  PlayerStat,
  StatType,
  StatTypes,
} from '../../../../redux/redux.definitions';
import {colors} from '../../../components/theme';
import {Headline5} from '../../../components/Typography';
import {StatButton} from './../components';
import {getRelevantCategories} from './services';

interface AddPlayerStatProps {
  game: string;
  player: string;
  onComplete: () => void;
  addPlayerStat: (game: string, stat: StatType) => void;
}

const AddPlayerStat = (props: AddPlayerStatProps) => (
  <div style={{display: 'flex'}}>
    {getRelevantCategories().map(category => (
      <div key={category.name} style={{flex: 1}}>
        <Headline5
          style={{
            padding: '2px',
            backgroundColor: colors.darkCoolGray,
            color: colors.white,
          }}
        >
          {category.name}
        </Headline5>
        {category.stats.map(stat => (
          <StatButton
            key={stat.shorthand}
            onClick={() => {
              if (props.player) {
                const playerStat: PlayerStat = {
                  type: StatTypes.playerStat,
                  shorthand: stat.shorthand,
                  player: props.player,
                };
                props.addPlayerStat(props.game, playerStat);
                props.onComplete();
              }
            }}
          >
            {stat.name}
          </StatButton>
        ))}
      </div>
    ))}
  </div>
);

export default connect(
  null,
  {addPlayerStat: addStatAction}
)(AddPlayerStat);
