import {padStart} from 'lodash';
import moment from 'moment';
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {
  PlayerStat,
  SetType,
  StatTypes,
} from '../../../../redux/redux.definitions';
import {Select} from '../../../components/Select';
import {Paragraph2} from '../../../components/Typography';
import players from '../../../services/players';
import {StatItem, StatListContainer} from './StatsList/components';

const getMinuteSecondDiff = (start, end) => {
  if (!start || !end) {
    return '-';
  }

  const seconds = moment(end).diff(start, 'seconds');
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = padStart((seconds % 60).toString(), 2, '0');
  return `${minutes}:${remainingSeconds}`;
};

interface PlayerTimedStatsProps extends RouteComponentProps<any> {
  set: SetType;
  playerName: string;
}

const PlayerTimedStats = ({
  set,
  playerName,
  history,
}: PlayerTimedStatsProps) => {
  const playerStats = (set.stats.filter(
    ({type}) => type === StatTypes.playerStat
  ) as PlayerStat[]).filter(({player}) => !playerName || player === playerName);

  return (
    <StatListContainer>
      <Select
        value={playerName}
        onChange={({target}) => {
          const currentPath = history.location.pathname;
          const pathParts = currentPath.split('/');
          const newPath = pathParts.slice(0, 5).join('/') + '/' + target.value;

          history.replace(newPath);
        }}
      >
        <option key={name} value="">
          All Players
        </option>
        {players.map(({name}) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      {playerStats.length ? (
        playerStats.map((stat, index) => (
          <StatItem
            key={index}
            setId={set.id}
            showTimestamp={getMinuteSecondDiff(
              set.recordingStartTime,
              stat.timestamp
            )}
            index={index}
            stat={stat}
          />
        ))
      ) : (
        <Paragraph2>No stats found for {playerName}</Paragraph2>
      )}
    </StatListContainer>
  );
};

export default withRouter(PlayerTimedStats);
