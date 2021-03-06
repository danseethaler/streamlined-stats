import {orderBy} from 'lodash';
import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {RootState} from '../../../../redux/reducers';
import {MatchesType} from '../../../../redux/redux.definitions';
import {ShadowDiv} from '../../../components/Bits';
import {linkCss} from '../../Match/Sets/components';

interface MatchesProps {
  matches: MatchesType;
}

class Matches extends React.Component<MatchesProps> {
  public render() {
    return (
      <div style={{flex: 1}}>
        {orderBy(this.props.matches, ['date']).map(match => (
          <ShadowDiv key={match.id}>
            <Link to={'/match/' + match.id} className={linkCss}>
              {moment(match.date).format('MM/DD')} - {match.opponent}{' '}
              {!match.home && '(away)'}
            </Link>
          </ShadowDiv>
        ))}
      </div>
    );
  }
}

export default connect(({matches}: RootState) => ({
  matches,
}))(Matches);
