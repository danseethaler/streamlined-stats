import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {undoLastStatAction} from '../../../redux/actions/games';
import {GameRedux} from '../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../components/Bits';
import Modal from '../../components/Modal';
import {Headline3} from '../../components/Typography';
import AddPlayerStat from './AddPlayerStat';
import {StatDisplay} from './components';
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
    return (
      <div>
        <Headline3>
          {game.opponent} - Set {game.set}
        </Headline3>
        <ColumnContainer>
          <Column>
            {game.rotation.map(player => (
              <div key={player}>
                <button
                  onClick={() => {
                    this.setState({statModalPlayer: player});
                  }}
                >
                  {player}
                </button>
              </div>
            ))}
          </Column>
          <Column>
            {game.stats.map((stat, index) => (
              <StatDisplay key={index} {...stat} />
            ))}
          </Column>

          <button
            onClick={() => {
              this.props.undoLastStat(game.id);
            }}
          >
            Undo last stat
          </button>
        </ColumnContainer>

        <button
          onClick={() => {
            this.setState({subModalOpen: true});
          }}
        >
          Substitution
        </button>

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

        <Modal
          // pageSized
          open={!!this.state.statModalPlayer}
          overlayClickCallback={() => {
            this.setState({
              statModalPlayer: null,
            });
          }}
          title={this.state.statModalPlayer || ''}
          content={
            <AddPlayerStat
              onComplete={() => {
                this.setState({statModalPlayer: null});
              }}
              game={game.id}
              player={this.state.statModalPlayer}
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
