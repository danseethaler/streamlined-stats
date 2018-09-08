import React from 'react';
import {connect} from 'react-redux';
import {addStatAction} from '../../../../../redux/actions/games';
import {
  GameRedux,
  StatTypes,
  SubsitutionStat,
} from '../../../../../redux/redux.definitions';
import {Column, ColumnContainer} from '../../../../components/Bits';
import Button, {ButtonTypes} from '../../../../components/Button';
import {styles} from '../../../../components/theme';
import {Headline6} from '../../../../components/Typography';
import players from '../../../../services/players';
import {sortByName} from '../../../../services/utilities';
import {Player} from './components';

interface SubstituteProps {
  onComplete: () => void;
  substitute: (game: string, sub: SubsitutionStat) => void;
  game: GameRedux;
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
    const {game} = this.props;

    return (
      <div>
        <ColumnContainer>
          <Column>
            <Headline6>Going In</Headline6>
            {sortByName(players)
              .filter(({name}) => game.rotation.indexOf(name) === -1)
              .map(({jersey, name}) => (
                <Player
                  key={jersey}
                  selected={this.state.subIn === name}
                  onClick={() => {
                    this.setState({subIn: name});
                  }}
                >
                  {name}
                </Player>
              ))}
          </Column>
          <Column style={{borderLeft: styles.lightBorder}}>
            <Headline6>Coming Out</Headline6>
            {game.rotation.map(player => (
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
        <Button
          type={ButtonTypes.primary}
          style={{float: 'right'}}
          onClick={() => {
            this.submit(game.id);
            this.props.onComplete();
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  {substitute: addStatAction}
)(Substitute);
