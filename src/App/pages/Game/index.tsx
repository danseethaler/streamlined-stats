import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import players from '../../../data/players.json';
import AddStat from './addStat';
import Modal from '../../components/Modal';

interface GameProps extends RouteComponentProps<any> {}

interface GameState {
  statModalPlayer: null | string;
}

class Game extends React.Component<GameProps, GameState> {
  public state = {
    statModalPlayer: null,
  };

  public render() {
    const {id: gameId} = this.props.match.params;
    return (
      <div>
        <h3>Game {gameId}</h3>
        <div>
          {players.map(player => (
            <div key={player.name}>
              <button
                onClick={() => {
                  this.setState({statModalPlayer: player.name});
                }}
              >
                {player.name}
              </button>
            </div>
          ))}
        </div>

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
            <AddStat
              onAddStat={() => {
                this.setState({statModalPlayer: null});
              }}
              game={gameId}
              player={this.state.statModalPlayer}
            />
          }
        />
      </div>
    );
  }
}

export default Game;
