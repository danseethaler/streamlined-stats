import {padStart} from 'lodash';
import moment from 'moment';
import React, {useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {
  PlayerStat,
  SetType,
  StatTypes,
} from '../../../../redux/redux.definitions';
import {Select} from '../../../components/Select';
import {Paragraph2} from '../../../components/Typography';
import players from '../../../services/players';
import {getFlatStatDefinitions} from '../../../services/stats/categories';
import {StatItem, StatListContainer} from './StatsList/components';

const flatDefinitions = getFlatStatDefinitions();

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
  goToVideoTime: (time: number) => void;
}

const PlayerTimedStats = ({
  set,
  playerName,
  history,
  goToVideoTime,
}: PlayerTimedStatsProps) => {
  const [statTypeFilter, setStatTypeFilter] = useState(null);

  let stats = set.stats;

  if (playerName) {
    stats = (stats as PlayerStat[]).filter(
      ({type, player}) => type === StatTypes.playerStat && player === playerName
    );
  }

  if (statTypeFilter) {
    stats = (stats as PlayerStat[]).filter(
      ({type, shorthand}) =>
        type === StatTypes.playerStat && shorthand === statTypeFilter
    );
  }

  return (
    <StatListContainer>
      <div>
        <Select
          value={playerName}
          onChange={({target}) => {
            const currentPath = history.location.pathname;
            const pathParts = currentPath.split('/');
            const newPath =
              pathParts.slice(0, 5).join('/') + '/' + target.value;

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
      </div>
      <div>
        <Select
          value={statTypeFilter}
          onChange={({target}) => {
            setStatTypeFilter(target.value);
          }}
        >
          <option key={name} value="">
            All Stats
          </option>
          {flatDefinitions.map(({name, shorthand}) => (
            <option key={name} value={shorthand}>
              {shorthand} - {name}
            </option>
          ))}
        </Select>
      </div>
      {stats.length ? (
        stats.map((stat, index) => (
          <StatItem
            key={index}
            setId={set.id}
            showTimestamp={getMinuteSecondDiff(
              set.recordingStartTime,
              stat.timestamp
            )}
            onClick={() => {
              const seconds = moment(stat.timestamp).diff(
                set.recordingStartTime,
                'seconds'
              );

              goToVideoTime(seconds - 5);
            }}
            index={index}
            stat={stat}
          />
        ))
      ) : (
        <Paragraph2>
          No stats found for {playerName} - {statTypeFilter}
        </Paragraph2>
      )}
    </StatListContainer>
  );
};

export default withRouter(PlayerTimedStats);
