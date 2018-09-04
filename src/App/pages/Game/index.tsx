import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {GameRedux} from '../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../components/Bits';
import {Headline3} from '../../components/Typography';
import AddPlayerStat from './AddPlayerStat';
import GameActions from './GameActions';
import ScoreBoard from './ScoreBoard';
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
    if (!game) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Headline3
          style={{
            padding: '1em',
            textAlign: 'center',
          }}
        >
          {game.opponent} - Set {game.set}
        </Headline3>
        <ScoreBoard game={game} />

        <ColumnContainer>
          <Column>
            <GameActions game={game} />
          </Column>

          <Column flex={2}>
            <AddPlayerStat game={game} />
          </Column>
          <Column>
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
