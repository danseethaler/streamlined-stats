import React from 'react';
import {connect} from 'react-redux';
import {addStatAction} from '../../../../redux/actions/games';
import {
  GameRedux,
  StatType,
  StatTypes,
  UsOrOpponent,
} from '../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../components/Button';
import Modal from '../../../components/Modal';
import {ActionContainer, ActionHeader} from './components';
import Substitute from './Substitute';

interface GameActionsProps {
  game: GameRedux;
  addStat: (game: string, stat: StatType) => void;
}

interface GameActionsState {
  statModalPlayer: null | string;
  subModalOpen: boolean;
}

class GameActions extends React.Component<GameActionsProps, GameActionsState> {
  public state = {
    statModalPlayer: null,
    subModalOpen: false,
  };

  public render() {
    const {game} = this.props;

    return (
      <ActionContainer>
        <div>
          <ActionHeader>Record Substitute</ActionHeader>
          <Button
            type={ButtonTypes.primary}
            onClick={() => {
              this.setState({subModalOpen: true});
            }}
          >
            Substitute a Player
          </Button>
        </div>

        <div>
          <ActionHeader>Record Timeout</ActionHeader>

          <Button
            type={ButtonTypes.primary}
            onClick={() => {
              this.props.addStat(game.id, {
                type: StatTypes.timeout,
                team: UsOrOpponent.us,
              });
            }}
          >
            Us
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
            Them
          </Button>
        </div>

        <div>
          <ActionHeader>Adjust Points</ActionHeader>

          <Button
            type={ButtonTypes.primary}
            onClick={() => {
              this.props.addStat(game.id, {
                type: StatTypes.pointAdjustment,
                team: UsOrOpponent.us,
              });
            }}
          >
            Us
          </Button>

          <Button
            type={ButtonTypes.gray}
            onClick={() => {
              this.props.addStat(game.id, {
                type: StatTypes.pointAdjustment,
                team: UsOrOpponent.opponent,
              });
            }}
          >
            Them
          </Button>
        </div>

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
      </ActionContainer>
    );
  }
}

export default connect(
  null,
  {
    addStat: addStatAction,
  }
)(GameActions);
