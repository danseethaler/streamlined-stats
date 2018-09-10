import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {GameRedux} from '../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../components/Bits';
import {Headline4, Paragraph3} from '../../components/Typography';
import AddPlayerStat from './AddPlayerStat';
import {HeaderContainer, PointsContainer} from './components';
import GameActions from './GameActions';
import {getScores} from './services';
import StatList from './StatsList';

interface GameProps {
  game: GameRedux;
}

interface GameState {
  statModalPlayer: null | string;
}

class Game extends React.Component<GameProps, GameState> {
  public state = {
    statModalPlayer: null,
  };

  public render() {
    const {game} = this.props;
    const scores = getScores(game.stats);

    if (!game) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <HeaderContainer>
          <Headline4
            style={{
              padding: '1em',
              textAlign: 'center',
            }}
          >
            {game.opponent} - Set {game.set}
          </Headline4>

          <PointsContainer>
            <Paragraph3>
              {game.opponent} {scores.opponent}
            </Paragraph3>
            <Paragraph3>Us {scores.us}</Paragraph3>
          </PointsContainer>
        </HeaderContainer>

        <ColumnContainer>
          <Column>
            <AddPlayerStat game={game} />
            <GameActions game={game} />
            <StatList game={game} />
          </Column>
        </ColumnContainer>
      </div>
    );
  }
}

export default connect(({games}, props) => ({
  game: games[props.match.params.id],
}))(Game);
