import {groupBy} from 'lodash';
import React from 'react';
import {
  GameRedux,
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../redux/redux.definitions';
import {Headline4} from '../../../components/Typography';
import {ScoreBoardContainer} from './components';
import {
  getStatDefinition,
  StatResultTypes,
} from '../../../services/stats_definitions';

interface ScoreBoardProps {
  game: GameRedux;
}

const getScores = (stats: StatType[]) =>
  stats.reduce(
    (pointObject, stat) => {
      if (stat.type === StatTypes.pointAdjustment) {
        pointObject[stat.team]++;
      } else if (stat.type === StatTypes.playerStat) {
        const {result} = getStatDefinition(stat.shorthand);

        if (result === StatResultTypes.point) {
          pointObject[UsOrOpponent.us]++;
        } else if (result === StatResultTypes.error) {
          pointObject[UsOrOpponent.opponent]++;
        }
      }
      return pointObject;
    },
    {
      us: 0,
      opponent: 0,
    }
  );

class ScoreBoard extends React.Component<ScoreBoardProps> {
  public render() {
    const {game} = this.props;
    const scores = getScores(game.stats);

    return (
      <ScoreBoardContainer>
        <Headline4
          style={{
            paddingBottom: '0.5em',
            textAlign: 'center',
          }}
        >
          Them {scores.opponent} - Us {scores.us}
        </Headline4>
      </ScoreBoardContainer>
    );
  }
}

export default ScoreBoard;
