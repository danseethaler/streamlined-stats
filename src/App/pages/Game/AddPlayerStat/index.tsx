import React from 'react';
import {connect} from 'react-redux';
import {addStatAction} from '../../../../redux/actions/games';
import {
  GameRedux,
  PlayerStat,
  StatType,
  StatTypes,
} from '../../../../redux/redux.definitions';
import {AddStatContainer} from './components';
import SelectPlayer from './components/SelectPlayer';
import SelectStat from './components/SelectStat';
import {getFormattedRotation} from './components/services';

interface AddPlayerStatProps {
  game: GameRedux;
  addPlayerStat: (game: string, stat: StatType) => void;
}

interface AddPlayerStatState {
  selectedStat: null | string;
  courtSwapped: boolean;
}

const initialState = {
  selectedStat: null,
  courtSwapped: false,
};

class AddPlayerStat extends React.Component<
  AddPlayerStatProps,
  AddPlayerStatState
> {
  public state = initialState;

  public selectPlayer = player => {
    const playerStat: PlayerStat = {
      type: StatTypes.playerStat,
      shorthand: this.state.selectedStat,
      player,
    };

    this.props.addPlayerStat(this.props.game.id, playerStat);
    this.setState(initialState);
  };

  public toggleCourtSides = () => {
    this.setState({courtSwapped: !this.state.courtSwapped});
  };

  public render() {
    const {game} = this.props;
    const {courtSwapped} = this.state;

    const rotation = getFormattedRotation(game, courtSwapped);

    return (
      <AddStatContainer>
        {this.state.selectedStat ? (
          <SelectPlayer
            swapCourtSides={this.toggleCourtSides}
            courtSwapped={courtSwapped}
            rotation={rotation}
            cancel={() => {
              this.setState(initialState);
            }}
            selectedStat={this.state.selectedStat}
            selectPlayer={this.selectPlayer}
          />
        ) : (
          <SelectStat
            game={game}
            selectedStat={this.state.selectedStat}
            selectStat={selectedStat => {
              this.setState({selectedStat});
            }}
          />
        )}
      </AddStatContainer>
    );
  }
}

export default connect(
  null,
  {addPlayerStat: addStatAction}
)(AddPlayerStat);
