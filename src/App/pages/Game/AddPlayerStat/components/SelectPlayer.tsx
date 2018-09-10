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
import {getMostLikelyStatPlayers} from './services';

interface Props {
  rotation: string[];
  selectedStat: string;
  selectPlayer: (player: string) => void;
  cancel: () => void;
  swapCourtSides: () => void;
  courtSwapped: boolean;
}

export const PlayerGrid = ({players, selectPlayer, selectedStat}) => {
  const playersData = players.map(player => getPlayerData(player));

  const highlightedPlayerIndexes = getMostLikelyStatPlayers(
    selectedStat,
    playersData
  );

  return (
    <PlayersContainer>
      {playersData.map(({jersey, photoPath, name}, index) => {
        return (
          <PlayerRow
            key={name}
            onClick={() => {
              selectPlayer(name);
            }}
            recommended={highlightedPlayerIndexes.indexOf(index) >= 0}
          >
            {/* {jersey} |  */}
            {name}
            <PlayerImage src={photoPath} />
          </PlayerRow>
        );
      })}
    </PlayersContainer>
  );
};

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
      <PlayerGrid
        players={rotation}
        selectPlayer={selectPlayer}
        selectedStat={selectedStat}
      />

      <ButtonNew icon={IoIosArrowRoundBack} text="Back" onClick={cancel} />
      <ButtonNew icon={IoIosSwap} text="Swap sides" onClick={swapCourtSides} />
    </SelectPlayerContainer>
  );
};

export default SelectPlayer;
