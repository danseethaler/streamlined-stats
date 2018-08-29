import {map} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

const Games = ({games}) =>
  map(games, game => (
    <div key={game.id}>
      <Link to={'/game/' + game.id}>{game.id}</Link>
    </div>
  ));

export default withRouter(connect(({games}) => ({games}))(Games));
