import {orderBy} from 'lodash';
import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {SetType} from '../../../../redux/redux.definitions';
import {ShadowDiv} from '../../../components/Bits';
import {getScores} from '../Set/services';
import {linkCss, MatchesContainer} from './components';

interface SetsProps extends RouteComponentProps<any> {
  matchId: string;
  sets: SetType[];
}

const Sets = ({matchId, sets}: SetsProps) => (
  <MatchesContainer>
    <ShadowDiv>
      {orderBy(sets, ['setNumber']).map(set => {
        const scores = getScores(set.stats);
        return (
          <Link
            key={set.id}
            to={`/match/${matchId}/set/${set.id}`}
            className={linkCss}
          >
            {set.setNumber} - {scores.us} to {scores.opponent}
          </Link>
        );
      })}
    </ShadowDiv>
  </MatchesContainer>
);

export default withRouter(Sets);
