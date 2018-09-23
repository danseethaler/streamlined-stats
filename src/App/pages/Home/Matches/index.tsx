import {map} from 'lodash';
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
      <div>
        {map(this.props.matches, match => (
          <ShadowDiv key={match.id}>
            <Link to={'/match/' + match.id} className={linkCss}>
              {match.opponent} - {match.date}
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
