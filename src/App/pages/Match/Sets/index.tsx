import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {SetType} from '../../../../redux/redux.definitions';
import {ShadowDiv} from '../../../components/Bits';
import {linkCss, MatchesContainer} from './components';

interface SetsProps extends RouteComponentProps<any> {
  matchId: string;
  sets: SetType[];
}

const Sets = ({matchId, sets}: SetsProps) => (
  <MatchesContainer>
    <ShadowDiv>
      {sets.map(set => (
        <Link
          key={set.id}
          to={`/match/${matchId}/set/${set.id}`}
          className={linkCss}
        >
          {set.setNumber}
        </Link>
      ))}
    </ShadowDiv>
  </MatchesContainer>
);

export default withRouter(Sets);
