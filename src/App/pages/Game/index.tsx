import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router';
import {undoLastStatAction, addStatAction} from '../../../redux/actions/games';
import {
  GameRedux,
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../components/Bits';
import Modal from '../../components/Modal';
import {Headline3} from '../../components/Typography';
import Stats from '../Stats';
import AddPlayerStat from './AddPlayerStat';
import {SelectRow, StatDisplay} from './components';
import Substitute from './Substitute';
import Button, {ButtonTypes} from '../../components/Button';

interface GameProps extends RouteComponentProps<any> {
  game: GameRedux;
  undoLastStat: (game: string) => void;
  addStat: (game: string, stat: StatType) => void;
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
            <Button
              type={ButtonTypes.primary}
              onClick={() => {
                this.setState({subModalOpen: true});
              }}
            >
              Substitute a Player
            </Button>
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

            <Button
              type={ButtonTypes.primary}
              onClick={() => {
                this.props.addStat(game.id, {
                  type: StatTypes.point,
                  team: UsOrOpponent.us,
                });
              }}
            >
              Point Us
            </Button>
            <Button
              type={ButtonTypes.gray}
              onClick={() => {
                this.props.addStat(game.id, {
                  type: StatTypes.point,
                  team: UsOrOpponent.opponent,
                });
              }}
            >
              Point Them
            </Button>

            <Button
              type={ButtonTypes.primary}
              onClick={() => {
                this.props.addStat(game.id, {
                  type: StatTypes.timeout,
                  team: UsOrOpponent.us,
                });
              }}
            >
              Timeout Us
            </Button>
            <Button
              type={ButtonTypes.gray}
              onClick={() => {
                this.props.addStat(game.id, {
                  type: StatTypes.timeout,
                  team: UsOrOpponent.opponent,
                });
              }}
            >
              Timeout Them
            </Button>
          </Column>
          <Column flex={2}>
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
            <Button
              type={ButtonTypes.danger}
              onClick={() => {
                this.props.undoLastStat(game.id);
              }}
            >
              Undo last stat
            </Button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              {game.stats.map((stat, index) => (
                <StatDisplay key={index} {...stat} />
              ))}
            </div>
          </Column>
        </ColumnContainer>

        <Stats games={[game]} />

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
  {
    undoLastStat: undoLastStatAction,
    addStat: addStatAction,
  }
)(Game);
