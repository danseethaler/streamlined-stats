import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, Redirect} from 'react-router';
import {undoLastStatAction} from '../../../redux/actions/games';
import {GameRedux} from '../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../components/Bits';
import Modal from '../../components/Modal';
import {Headline3} from '../../components/Typography';
import AddPlayerStat from './AddPlayerStat';
import {SelectRow, StatDisplay} from './components';
import Substitute from './Substitute';

interface GameProps extends RouteComponentProps<any> {
  game: GameRedux;
  undoLastStat: (game: string) => void;
}

interface GameState {
  statModalPlayer: null | string;
  subModalOpen: boolean;
}

class Game extends React.Component<GameProps, GameState> {
  public state = {
    statModalPlayer: null,
    subModalOpen: false,
  };

  public render() {
    const {game} = this.props;
    if (!game) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Headline3>
          {game.opponent} - Set {game.set}
        </Headline3>
        <ColumnContainer>
          <Column>
            <button
              onClick={() => {
                this.setState({subModalOpen: true});
              }}
            >
              Substitute a Player
            </button>
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
          <Column>
            {this.state.statModalPlayer && (
              <AddPlayerStat
                onComplete={() => {
                  this.setState({statModalPlayer: null});
                }}
                game={game.id}
                player={this.state.statModalPlayer}
              />
            )}
          </Column>
          <Column>
            <button
              onClick={() => {
                this.props.undoLastStat(game.id);
              }}
            >
              Undo last stat
            </button>
            {game.stats.map((stat, index) => (
              <StatDisplay key={index} {...stat} />
            ))}
          </Column>
        </ColumnContainer>

        <Modal
          // pageSized
          open={this.state.subModalOpen}
          overlayClickCallback={() => {
            this.setState({subModalOpen: false});
          }}
          title="Substitute a player"
          content={
            <Substitute
              onComplete={() => {
                this.setState({subModalOpen: false});
              }}
            />
          }
        />
      </div>
    );
  }
}

export default connect(
  ({games}, props) => ({
    game: games[props.match.params.id],
  }),
  {undoLastStat: undoLastStatAction}
)(Game);
