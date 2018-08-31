import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router';
import {GameRedux} from '../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../components/Bits';
import {Headline3} from '../../components/Typography';
import Stats from '../Stats';
import AddPlayerStat from './AddPlayerStat';
import {SelectRow} from './components';
import GameActions from './GameActions';
import ScoreBoard from './ScoreBoard';
import StatList from './StatsList';
interface GameProps extends RouteComponentProps<any> {
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

          <Column>
            {game.rotation.map(player => (
              <SelectRow
                key={player}
                selected={this.state.statModalPlayer === player}
                onClick={() => {
                  this.setState({statModalPlayer: player});
                }}
              >
                {player}
              </SelectRow>
            ))}
          </Column>
          <Column flex={2}>
            {
              <AddPlayerStat
                onComplete={() => {
                  this.setState({statModalPlayer: null});
                }}
                game={game.id}
                player={this.state.statModalPlayer}
              />
            }
          </Column>
          <Column>
            <StatList game={game} />
          </Column>
        </ColumnContainer>

        <Stats games={[game]} />
      </div>
    );
  }
}

export default connect(({games}, props) => ({
  game: games[props.match.params.id],
}))(Game);
