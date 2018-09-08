import React from 'react';
import {GameRedux} from '../../../../../redux/redux.definitions';
import ButtonNew from '../../../../components/ButtonNew';
import {getPlayerData} from '../../../../services/players';
import {
  PlayerImage,
  PlayerRow,
  PlayersContainer,
  SelectPlayerContainer,
} from './index';

interface Props {
  game: GameRedux;
  selectedStat: string;
  selectPlayer: (player: string) => void;
  cancel: () => void;
}

const SelectPlayer: React.SFC<Props> = ({
  game,
  selectedStat,
  selectPlayer,
  cancel,
}) => (
  <SelectPlayerContainer>
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
    <ButtonNew text="Back" onClick={cancel} />
  </SelectPlayerContainer>
);

export default SelectPlayer;
