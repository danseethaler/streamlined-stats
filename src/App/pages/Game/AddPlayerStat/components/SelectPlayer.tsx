import React from 'react';
import {GameRedux} from '../../../../../redux/redux.definitions';
import {getPlayerData} from '../../../../services/players';
import {
  PlayerImage,
  PlayerRow,
  PlayersContainer,
  SelectedCircle,
} from './index';

interface Props {
  game: GameRedux;
  selectedStat: string;
  selectPlayer: (player: string) => void;
}

const SelectPlayer: React.SFC<Props> = ({game, selectedStat, selectPlayer}) => (
  <PlayersContainer>
    {game.rotation.map(player => {
      const {jersey, photoPath} = getPlayerData(player);

      return (
        <PlayerRow
          key={player}
          onClick={() => {
            selectPlayer(player);
          }}
        >
          {jersey} | {player}
          <PlayerImage src={photoPath} />
        </PlayerRow>
      );
    })}
  </PlayersContainer>
);

export default SelectPlayer;
