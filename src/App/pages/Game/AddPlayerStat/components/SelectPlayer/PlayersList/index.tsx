import {orderBy} from 'lodash';
import React from 'react';
import {getPlayerData} from '../../../../../../services/players';
import {getMostLikelyStatPlayers} from '../../services';
import {
  LeftDiv,
  PlayerImage,
  PlayerRow,
  PlayersContainer,
  RecommendedPlayer,
} from './components';

interface PlayersListProps {
  players: string[];
  selectedStat: string;
  selectPlayer: (playerName: string) => void;
}

const PlayersList: React.SFC<PlayersListProps> = ({
  players,
  selectPlayer,
  selectedStat,
}) => {
  const playersData = players.map(player => getPlayerData(player));

  const orderedPlayers = orderBy(playersData, ['jersey'], ['asc']);

  const highlightedPlayerIndexes = getMostLikelyStatPlayers(
    selectedStat,
    orderedPlayers
  );

  return (
    <PlayersContainer>
      {orderedPlayers.map(({jersey, photoPath, name}, index) => (
        <PlayerRow
          key={name}
          onClick={() => {
            selectPlayer(name);
          }}
        >
          <LeftDiv>
            <RecommendedPlayer
              recommended={highlightedPlayerIndexes.indexOf(index) >= 0}
            />
            {jersey} - {name}
          </LeftDiv>
          <PlayerImage src={photoPath} />
        </PlayerRow>
      ))}
    </PlayersContainer>
  );
};

export default PlayersList;
