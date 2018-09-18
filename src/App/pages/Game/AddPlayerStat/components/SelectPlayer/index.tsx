import React from 'react';
import {IoIosArrowRoundBack, IoIosSwap} from 'react-icons/io';
import {SelectPlayerContainer} from '..';
import ButtonNew from '../../../../../components/ButtonNew';
import {Headline4} from '../../../../../components/Typography';
import {getStatDefinition} from '../../../../../services/stats/categories';
import PlayersGrid from './PlayersGrid';
import PlayersList from './PlayersList';

interface Props {
  rotation: string[];
  selectedStat: string;
  selectPlayer: (player: string) => void;
  cancel: () => void;
  swapCourtSides: () => void;
  courtSwapped: boolean;
  usingRotation: boolean;
}

const SelectPlayer: React.SFC<Props> = ({
  rotation,
  selectedStat,
  selectPlayer,
  cancel,
  swapCourtSides,
  courtSwapped,
  usingRotation,
}) => {
  const {category, name} = getStatDefinition(selectedStat);

  return (
    <SelectPlayerContainer>
      <Headline4 style={{margin: '6px 0'}}>
        {category} {name} by...
      </Headline4>
      {usingRotation ? (
        <PlayersGrid
          players={rotation}
          selectPlayer={selectPlayer}
          selectedStat={selectedStat}
          courtSwapped={courtSwapped}
        />
      ) : (
        <PlayersList
          players={rotation}
          selectPlayer={selectPlayer}
          selectedStat={selectedStat}
        />
      )}

      <ButtonNew icon={IoIosArrowRoundBack} text="Back" onClick={cancel} />
      {usingRotation && (
        <ButtonNew
          icon={IoIosSwap}
          text="Swap sides"
          onClick={swapCourtSides}
        />
      )}
    </SelectPlayerContainer>
  );
};

export default SelectPlayer;
