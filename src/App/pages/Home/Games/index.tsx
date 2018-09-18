import {groupBy, map, orderBy} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {GamesRedux} from '../../../../redux/redux.definitions';
import {ShadowDiv} from '../../../components/Bits';
import {gameLink, MatchesContainer} from './components';

const Games = ({games}: {games: GamesRedux}) => {
  const matches = groupBy(games, ({opponent}) => opponent);

  const orderedMatches = orderBy(matches, [
    matchGames => matchGames[0].opponent.toLowerCase(),
  ]);

  return (
    <MatchesContainer>
      {map(orderedMatches, (matchGames, opponent) => (
        <ShadowDiv key={opponent}>
          {matchGames.map(game => (
            <Link key={game.id} to={'/game/' + game.id} className={gameLink}>
              {game.opponent} - {game.set}
            </Link>
          ))}
        </ShadowDiv>
      ))}
    </MatchesContainer>
  );
};

export default withRouter(connect(({games}) => ({games}))(Games));
