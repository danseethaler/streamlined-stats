import moment from 'moment';
import React from 'react';
import {IoIosArrowBack, IoMdAddCircle} from 'react-icons/io';
import {connect} from 'react-redux';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {addSetAction} from '../../../redux/actions/sets';
import {RootState} from '../../../redux/reducers';
import {MatchType, SetsType, SetType} from '../../../redux/redux.definitions';
import {ContentContainer} from '../../components/Bits/ContentContainer';
import {HeaderContainer, HeaderSegment} from '../../components/Bits/TopBar';
import Button, {ButtonTypes} from '../../components/Button';
import LeaderBoard from '../../components/LeaderBoard';
import {colors} from '../../components/theme';
import {Headline4, Paragraph2} from '../../components/Typography';
import {getUniqueId} from '../../services/unique_id';
import {Columns, PointsContainer, PointSquare} from './components';
import {downloadMaxPrepsExport, getMatchSet, getMatchSets} from './services';
import EditSet from './Set/EditSet';
import ReviewSet from './Set/ReviewSet';
import {getScores} from './Set/services';
import Sets from './Sets';
import Stats from './Stats';

interface MatchProps extends RouteComponentProps<any> {
  reduxMatch: MatchType;
  sets: SetsType;
  matchId: string;
  addSet: (set: SetType) => void;
}

interface MatchState {
  addSetModalOpen: boolean;
}

class Match extends React.Component<MatchProps, MatchState> {
  public state = {
    addSetModalOpen: true,
  };

  public canAddSet = () => getMatchSets(this.props.reduxMatch.id).length < 5;

  public addSet = () => {
    if (!this.canAddSet()) {
      return;
    }

    const {reduxMatch} = this.props;

    const setNumber = getMatchSets(reduxMatch.id).length + 1;
    const id = getUniqueId();

    this.props.addSet({
      id,
      matchId: reduxMatch.id,
      setNumber,
      stats: [],
    });

    this.props.history.push(`/match/${reduxMatch.id}/set/${id}/edit`);
  };

  public getHeaderText = (): string => {
    const {reduxMatch, match} = this.props;

    let headerText = `${reduxMatch.opponent} - `;

    if (match.params.setId) {
      headerText += 'Set ' + getMatchSet(match.params.setId).setNumber;
    } else {
      headerText += moment(reduxMatch.date).format('MM/D');

      if (!reduxMatch.home) {
        headerText += ' (away)';
      }
    }

    return headerText;
  };

  public render() {
    const {reduxMatch, match} = this.props;

    if (!reduxMatch) {
      return <Redirect to="/" />;
    }

    const matchSets = getMatchSets(reduxMatch.id);

    return (
      <ContentContainer>
        <HeaderContainer>
          <HeaderSegment>
            <Link to={match.params.setId ? `/match/${reduxMatch.id}` : '/'}>
              <IoIosArrowBack size={24} color={colors.gray} />
            </Link>
            <Headline4
              style={{
                display: 'flex',
                padding: '1em 1em 1em 0.3em',
                textAlign: 'center',
              }}
            >
              {this.getHeaderText()}
            </Headline4>
          </HeaderSegment>

          <Switch>
            <Route
              path={`/match/${reduxMatch.id}/set/:setId`}
              render={() => {
                const setId = match.params.setId;
                const set = getMatchSet(setId);
                const scores = getScores(set.stats);

                return (
                  <PointsContainer>
                    <PointSquare>
                      <Paragraph2>GUEST</Paragraph2>
                      <Headline4>
                        {reduxMatch.home ? scores.opponent : scores.us}
                      </Headline4>
                    </PointSquare>
                    <PointSquare>
                      <Paragraph2>HOME</Paragraph2>
                      <Headline4>
                        {reduxMatch.home ? scores.us : scores.opponent}
                      </Headline4>
                    </PointSquare>
                  </PointsContainer>
                );
              }}
            />
            <Route
              exact
              path={`/match/${reduxMatch.id}`}
              render={() => (
                <HeaderSegment>
                  <Button
                    type={ButtonTypes.primary}
                    styleOverrides={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => {
                      this.addSet();
                    }}
                    disabled={!this.canAddSet()}
                  >
                    <IoMdAddCircle
                      style={{marginRight: '0.5em'}}
                      size={18}
                      color={colors.white}
                    />{' '}
                    Add Set
                  </Button>

                  <Button
                    type={ButtonTypes.accent}
                    onClick={() => {
                      this.props.history.push(`/match/${reduxMatch.id}/stats`);
                    }}
                  >
                    Show Stats
                  </Button>
                </HeaderSegment>
              )}
            />
          </Switch>
        </HeaderContainer>
        <Switch>
          <Route
            path={`/match/${reduxMatch.id}/set/:setId/edit`}
            component={EditSet}
          />
          <Route
            path={`/match/${reduxMatch.id}/set/:setId/:playerName?`}
            component={ReviewSet}
          />
          <Route
            path={`/match/${reduxMatch.id}/stats`}
            render={() => <Stats sets={matchSets} />}
          />
          <Route
            render={() => (
              <Columns>
                <div>
                  <Sets matchId={reduxMatch.id} sets={matchSets} />
                  <Button
                    type={ButtonTypes.primary}
                    onClick={() => {
                      downloadMaxPrepsExport(matchSets);
                    }}
                  >
                    Download MaxPreps Export
                  </Button>
                </div>
                <LeaderBoard sets={matchSets} />
              </Columns>
            )}
          />
        </Switch>
      </ContentContainer>
    );
  }
}

export default connect(
  ({matches, sets}: RootState, props: MatchProps) => ({
    reduxMatch: matches[props.match.params.matchId],
    sets,
  }),
  {
    addSet: addSetAction,
  }
)(Match);
