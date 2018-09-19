import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {GameRedux} from '../../../redux/redux.definitions';
import SpeechToText from '../../components/SpeechToText';
import {Headline4, Paragraph3} from '../../components/Typography';
import {GameContainer, HeaderContainer, PointsContainer} from './components';
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
      <GameContainer>
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

        <StatList game={game} />

        <SpeechToText game={game} />
      </GameContainer>
    );
  }
}

export default connect(({games}, props) => ({
  game: games[props.match.params.id],
}))(Game);
