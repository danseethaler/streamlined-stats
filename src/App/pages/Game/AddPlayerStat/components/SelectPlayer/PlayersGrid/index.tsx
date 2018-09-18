import React from 'react';
import {getPlayerData} from '../../../../../../services/players';
import {getMostLikelyStatPlayers} from '../../services';
import {PlayerImage, PlayerRow, PlayersContainer} from './components';

interface PlayersGridProps {
  players: string[];
  selectedStat: string;
  courtSwapped: boolean;
  selectPlayer: (playerName: string) => void;
}

const PlayersGrid: React.SFC<PlayersGridProps> = ({
  players,
  courtSwapped,
  selectPlayer,
  selectedStat,
}) => {
  const playersData = players.map(player => getPlayerData(player));

  const highlightedPlayerIndexes = getMostLikelyStatPlayers(
    selectedStat,
    playersData
  );

  return (
    <PlayersContainer courtSwapped={courtSwapped}>
      {playersData.map(({photoPath, name}, index) => (
        <PlayerRow
          key={name}
          onClick={() => {
            selectPlayer(name);
          }}
          recommended={highlightedPlayerIndexes.indexOf(index) >= 0}
        >
          {name}
          <PlayerImage src={photoPath} />
        </PlayerRow>
      ))}
    </PlayersContainer>
  );
};

export default PlayersGrid;
