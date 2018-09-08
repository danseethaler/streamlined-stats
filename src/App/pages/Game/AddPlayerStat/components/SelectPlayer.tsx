import React from 'react';
import {IoIosArrowRoundBack, IoIosSwap} from 'react-icons/io';
import ButtonNew from '../../../../components/ButtonNew';
import {Headline4} from '../../../../components/Typography';
import {getPlayerData} from '../../../../services/players';
import {getStatDefinition} from '../../../../services/stats/categories';
import {
  PlayerImage,
  PlayerRow,
  PlayersContainer,
  SelectPlayerContainer,
} from './index';

interface Props {
  rotation: string[];
  selectedStat: string;
  selectPlayer: (player: string) => void;
  cancel: () => void;
  swapCourtSides: () => void;
  courtSwapped: boolean;
}

export const PlayerGrid = ({players, selectPlayer}) => (
  <PlayersContainer>
    {players.map(player => {
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

const SelectPlayer: React.SFC<Props> = ({
  rotation,
  selectedStat,
  selectPlayer,
  cancel,
  swapCourtSides,
  courtSwapped,
}) => {
  const {name} = getStatDefinition(selectedStat);

  return (
    <SelectPlayerContainer swapped={courtSwapped}>
      <Headline4 style={{margin: '6px 0'}}>{name} by...</Headline4>
      <PlayerGrid players={rotation} selectPlayer={selectPlayer} />

      <ButtonNew icon={IoIosArrowRoundBack} text="Back" onClick={cancel} />
      <ButtonNew icon={IoIosSwap} text="Swap sides" onClick={swapCourtSides} />
    </SelectPlayerContainer>
  );
};

export default SelectPlayer;
