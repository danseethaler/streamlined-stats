import {map} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {addGameAction, GameAction} from '../../../redux/actions/games';
import players from '../../services/players';
import {getUniqueId} from '../../services/unique_id';
import Button, {ButtonTypes} from '../../components/Button';

interface AddGameProps extends RouteComponentProps<any> {
  addGame: (game: GameAction) => void;
}

interface AddGameState {
  formError: null | string;
}

class AddGame extends React.Component<AddGameProps, AddGameState> {
  public state = {formError: null};

  private opponentRef: React.RefObject<HTMLInputElement>;
  private setRef: React.RefObject<HTMLInputElement>;
  private lineupRefs: any;

  constructor(props) {
    super(props);

    this.opponentRef = React.createRef();
    this.setRef = React.createRef();
    this.lineupRefs = players.map(() => React.createRef());
  }

  public validateForm = () => {
    const gameData = this.getGameData();
    if (!gameData.opponent) {
      this.setState({formError: 'Please add an opponent.'});
      return false;
    }
    if ([1, 2, 3, 4, 5].indexOf(gameData.set) === -1) {
      this.setState({formError: 'Select a game number between 1 and 5'});
      return false;
    }
    if (gameData.lineup.length !== 6) {
      this.setState({formError: 'Lineup should have 6 players'});
      return false;
    }
    return true;
  };

  public getGameData = (): GameAction => {
    const opponent = this.opponentRef.current.value;
    const set = parseInt(this.setRef.current.value, 10);
    const lineup = players
      .filter((player, index) => this.lineupRefs[index].current.checked)
      .map(({name}) => name);

    return {
      id: getUniqueId(),
      opponent,
      set,
      lineup,
    };
  };

  public render() {
    const {history, addGame} = this.props;
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <input ref={this.opponentRef} placeholder="Opponent" />
        </div>
        <div>
          <input ref={this.setRef} placeholder="Set Number" type="number" />
        </div>
        <h4>Lineup</h4>
        <ul>
          {map(players, (player, playerId) => (
            <label key={player.jersey}>
              <li>
                <input ref={this.lineupRefs[playerId]} type="checkbox" />
                {player.name}
              </li>
            </label>
          ))}
        </ul>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            if (this.validateForm()) {
              const gameData = this.getGameData();
              addGame(gameData);
              history.push('/game/' + gameData.id);
            }
          }}
        >
          Add Set
        </Button>

        {this.state.formError && (
          <React.Fragment>
            <hr />
            <h5>{this.state.formError}</h5>
          </React.Fragment>
        )}
      </form>
    );
  }
}

export default withRouter(
  connect(
    ({games}) => ({games}),
    {
      addGame: addGameAction,
    }
  )(AddGame)
);
