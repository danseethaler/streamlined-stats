import {orderBy} from 'lodash';
import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {SetType} from '../../../../redux/redux.definitions';
import {ShadowDiv} from '../../../components/Bits';
import {getScores} from '../Set/services';
import {linkCss} from './components';
import {Columns} from '../components';

interface SetsProps extends RouteComponentProps<any> {
  matchId: string;
  sets: SetType[];
}

const Sets = ({matchId, sets}: SetsProps) => (
  <ShadowDiv>
    {orderBy(sets, ['setNumber']).map(set => {
      const scores = getScores(set.stats);
      return (
        <Columns key={set.id}>
          <Link to={`/match/${matchId}/set/${set.id}`} className={linkCss}>
            {set.setNumber} - {scores.us} to {scores.opponent}
          </Link>
          <Link to={`/match/${matchId}/set/${set.id}/edit`} className={linkCss}>
            Edit
          </Link>
        </Columns>
      );
    })}
  </ShadowDiv>
);

export default withRouter(Sets);
