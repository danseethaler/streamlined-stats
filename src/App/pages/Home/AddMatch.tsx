import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';
import {addMatchAction} from '../../../redux/actions/matches';
import {MatchType} from '../../../redux/redux.definitions';
import {Hr, TextInput} from '../../components/Bits';
import Button, {ButtonTypes} from '../../components/Button';
import {Paragraph3} from '../../components/Typography';
import {getUniqueId} from '../../services/unique_id';

interface AddMatchProps extends RouteComponentProps<any> {
  addMatch: (set: MatchType) => void;
}

interface AddMatchState {
  formError: null | string;
}

class AddMatch extends React.Component<AddMatchProps, AddMatchState> {
  public state = {
    formError: null,
  };

  private opponentRef: React.RefObject<HTMLInputElement>;
  private dateRef: React.RefObject<HTMLInputElement>;
  private homeRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.opponentRef = React.createRef();
    this.dateRef = React.createRef();
    this.homeRef = React.createRef();
  }

  public componentDidMount() {
    this.opponentRef.current.select();
  }

  public validateForm = () => {
    const matchData = this.getMatchData();
    if (!matchData.opponent) {
      this.setState({formError: 'Please add an opponent.'});
      return false;
    }

    if (!matchData.date) {
      this.setState({formError: 'Set the match date'});
      return false;
    }
    return true;
  };

  public getMatchData = (): MatchType => {
    const opponent = this.opponentRef.current.value;
    const date = this.dateRef.current.value;
    const home = this.homeRef.current.checked;
    const id = getUniqueId();

    return {
      id,
      opponent,
      date,
      home,
    };
  };

  public addMatch = () => {
    const matchData = this.getMatchData();
    this.props.addMatch(matchData);
    this.props.history.push('/match/' + matchData.id);
  };

  public render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <Paragraph3>Opponent</Paragraph3>
        <TextInput innerRef={this.opponentRef} type="text" />

        <Paragraph3>Home Game</Paragraph3>
        <TextInput innerRef={this.homeRef} type="checkbox" />

        <Paragraph3>Date</Paragraph3>
        <TextInput innerRef={this.dateRef} type="date" />

        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            if (this.validateForm()) {
              this.addMatch();
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

export default connect(
  null,
  {
    addMatch: addMatchAction,
  }
)(withRouter(AddMatch));
