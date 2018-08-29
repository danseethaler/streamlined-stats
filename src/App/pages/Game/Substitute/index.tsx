import React from 'react';
import {connect} from 'react-redux';
import players from '../../../../data/players';
import {addStatAction} from '../../../../redux/actions/games';
import {StatTypes, SubsitutionStat} from '../../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../../components/Bits';
import {styles} from '../../../components/theme';
import {Headline6} from '../../../components/Typography';
import {getCurrentGame} from '../../../services/redux';
import {Player} from './components';

interface SubstituteProps {
  onComplete: () => void;
  substitute: (game: string, sub: SubsitutionStat) => void;
}

interface SubstituteState {
  subOut: string;
  subIn: string;
}

class Substitute extends React.Component<SubstituteProps, SubstituteState> {
  public state = {
    subOut: '',
    subIn: '',
  };

  public submit = game => {
    const {subOut, subIn} = this.state;
    if (subOut && subIn) {
      this.props.substitute(game, {
        type: StatTypes.substitute,
        subOut,
        subIn,
      });
    }
  };

  public render() {
    const currentGame = getCurrentGame();
    if (!currentGame) {
      return null;
    }
    return (
      <div>
        <ColumnContainer>
          <Column>
            <Headline6>Going In</Headline6>
            {players
              .map(({name}) => name)
              .filter(player => currentGame.rotation.indexOf(player) === -1)
              .map(player => (
                <Player
                  key={player}
                  selected={this.state.subIn === player}
                  onClick={() => {
                    this.setState({subIn: player});
                  }}
                >
                  {player}
                </Player>
              ))}
          </Column>
          <Column style={{borderLeft: styles.lightBorder}}>
            <Headline6>Coming Out</Headline6>
            {currentGame.rotation.map(player => (
              <Player
                key={player}
                selected={this.state.subOut === player}
                onClick={() => {
                  this.setState({subOut: player});
                }}
              >
                {player}
              </Player>
            ))}
          </Column>
        </ColumnContainer>
        <button
          style={{float: 'right'}}
          onClick={() => {
            this.submit(currentGame.id);
            this.props.onComplete();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  {substitute: addStatAction}
)(Substitute);
