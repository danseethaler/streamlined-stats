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

interface AddPlayerStatProps {
  game: GameRedux;
  addPlayerStat: (game: string, stat: StatType) => void;
}

interface AddPlayerStatState {
  selectedStat: null | string;
}

const initialState = {
  selectedStat: null,
};

class AddPlayerStat extends React.Component<
  AddPlayerStatProps,
  AddPlayerStatState
> {
  public state = initialState;

  public render() {
    const {addPlayerStat, game} = this.props;

    return (
      <AddStatContainer>
        {this.state.selectedStat ? (
          <SelectPlayer
            game={game}
            cancel={() => {
              this.setState(initialState);
            }}
            selectedStat={this.state.selectedStat}
            selectPlayer={player => {
              const playerStat: PlayerStat = {
                type: StatTypes.playerStat,
                shorthand: this.state.selectedStat,
                player,
              };

              addPlayerStat(game.id, playerStat);
              this.setState(initialState);
            }}
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
