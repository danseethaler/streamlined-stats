import {map} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {GamesRedux} from '../../redux/redux.definitions';

const Games = ({games}: {games: GamesRedux}) =>
  map(games, game => (
    <div key={game.id}>
      <Link to={'/game/' + game.id}>
        {game.opponent} - {game.set}
      </Link>
    </div>
  ));

export default withRouter(connect(({games}) => ({games}))(Games));
