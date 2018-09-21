import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {addGameAction} from '../../../redux/actions/games';
import {GameRedux} from '../../../redux/redux.definitions';
import {Hr, TextInput} from '../../components/Bits';
import Button, {ButtonTypes} from '../../components/Button';
import {Paragraph3} from '../../components/Typography';
import {getUniqueId} from '../../services/unique_id';

interface AddGameProps extends RouteComponentProps<any> {
  addGame: (game: GameRedux) => void;
}

interface AddGameState {
  formError: null | string;
}

class AddGame extends React.Component<AddGameProps, AddGameState> {
  public state = {
    formError: null,
  };

  private opponentRef: React.RefObject<HTMLInputElement>;
  private setRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.opponentRef = React.createRef();
    this.setRef = React.createRef();
  }

  public componentDidMount() {
    this.opponentRef.current.select();
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
    return true;
  };

  public getGameData = (): GameRedux => {
    const opponent = this.opponentRef.current.value;
    const set = parseInt(this.setRef.current.value, 10);

    const gameData = {
      id: getUniqueId(),
      opponent,
      set,
      stats: [],
    };

    return gameData;
  };

  public render() {
    const {history, addGame} = this.props;

    return (
      <form onSubmit={e => e.preventDefault()}>
        <Paragraph3>Opponent</Paragraph3>
        <TextInput innerRef={this.opponentRef} />

        <Paragraph3>Set Number</Paragraph3>
        <TextInput innerRef={this.setRef} type="number" />

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
          Continue
        </Button>

        {this.state.formError && (
          <React.Fragment>
            <Hr />
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
