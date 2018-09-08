import React from 'react';
import {IoIosArrowRoundBack, IoIosSwap} from 'react-icons/io';
import {GameRedux} from '../../../../../redux/redux.definitions';
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
import {getFormattedRotation, getRotation} from './services';

interface Props {
  game: GameRedux;
  selectedStat: string;
  selectPlayer: (player: string) => void;
  cancel: () => void;
  swapCourtSides: () => void;
  courtSwapped: boolean;
}

const SelectPlayer: React.SFC<Props> = ({
  game,
  selectedStat,
  selectPlayer,
  cancel,
  swapCourtSides,
  courtSwapped,
}) => {
  const rotation = getRotation(game.lineup, game.stats, game.serveFirst);
  const formattedRotation = getFormattedRotation(rotation, courtSwapped);

  const {name} = getStatDefinition(selectedStat);

  return (
    <SelectPlayerContainer swapped={courtSwapped}>
      <Headline4 style={{margin: '6px 0'}}>{name} by...</Headline4>
      <PlayersContainer>
        {formattedRotation.map(player => {
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
      <ButtonNew icon={IoIosArrowRoundBack} text="Back" onClick={cancel} />
      <ButtonNew icon={IoIosSwap} text="Swap sides" onClick={swapCourtSides} />
    </SelectPlayerContainer>
  );
};

export default SelectPlayer;
