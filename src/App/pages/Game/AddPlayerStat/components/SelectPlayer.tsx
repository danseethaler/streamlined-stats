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
import {getRotation} from './services';
import {Headline4} from '../../../../components/Typography';
import {getStatDefinition} from '../../../../services/stats/categories';

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
}) => {
  const rotation = getRotation(game.lineup, game.stats, game.serveFirst);
  const formattedRotation = [
    rotation[1],
    rotation[0],
    rotation[2],
    rotation[5],
    rotation[3],
    rotation[4],
  ];

  const {name} = getStatDefinition(selectedStat);

  return (
    <SelectPlayerContainer>
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
      <ButtonNew text="Back" onClick={cancel} />
    </SelectPlayerContainer>
  );
};

export default SelectPlayer;
