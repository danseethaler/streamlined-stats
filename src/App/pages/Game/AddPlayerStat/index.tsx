import React from 'react';
import {connect} from 'react-redux';
import {addStatAction} from '../../../../redux/actions/games';
import {
  GameRedux,
  PlayerStat,
  StatType,
  StatTypes,
} from '../../../../redux/redux.definitions';
import {Headline5} from '../../../components/Typography';
import {AddHandlingContainer, AddStatContainer} from './components';
import SelectPlayer, {PlayerGrid} from './components/SelectPlayer';
import SelectStat from './components/SelectStat';
import {getFormattedRotation} from './components/services';
import {
  getShorthandBallHandlingFromAttack,
  statIsMissingBallHandling,
} from './services';

interface AddPlayerStatProps {
  game: GameRedux;
  addPlayerStat: (game: string, stat: StatType, insertBefore?: boolean) => void;
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

  public addBallHandlingStat = player => {
    const {game} = this.props;
    const {shorthand} = game.stats[0] as PlayerStat;
    const shorthandSet = getShorthandBallHandlingFromAttack(shorthand);

    const playerStat: PlayerStat = {
      type: StatTypes.playerStat,
      shorthand: shorthandSet,
      player,
    };

    this.props.addPlayerStat(this.props.game.id, playerStat, true);
    this.setState(initialState);
  };

  public toggleCourtSides = () => {
    this.setState({courtSwapped: !this.state.courtSwapped});
  };

  public render() {
    const {game} = this.props;
    const {courtSwapped} = this.state;

    const needBallHandlingStat = statIsMissingBallHandling(game.stats);
    const rotation = getFormattedRotation(game, courtSwapped);

    let selectBallHander = null;
    if (needBallHandlingStat) {
      const lastStat = game.stats[0] as PlayerStat;
      const attackStat = getShorthandBallHandlingFromAttack(lastStat.shorthand);

      selectBallHander = (
        <AddHandlingContainer>
          <Headline5 style={{margin: '10px 0'}}>Ball handling by...</Headline5>
          <PlayerGrid
            players={rotation}
            selectPlayer={this.addBallHandlingStat}
            selectedStat={attackStat}
          >
            selecthandler
          </PlayerGrid>
        </AddHandlingContainer>
      );
    }

    return (
      <AddStatContainer>
        {selectBallHander}
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
