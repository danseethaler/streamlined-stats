import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {connect} from 'react-redux';
import {Redirect, Route, RouteComponentProps, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {addSetAction} from '../../../redux/actions/sets';
import {RootState} from '../../../redux/reducers';
import {MatchType, SetType} from '../../../redux/redux.definitions';
import {ContentContainer} from '../../components/Bits/ContentContainer';
import {HeaderContainer, HeaderSegment} from '../../components/Bits/TopBar';
import Button, {ButtonTypes} from '../../components/Button';
import {colors} from '../../components/theme';
import {Headline4, Paragraph3} from '../../components/Typography';
import {getUniqueId} from '../../services/unique_id';
import {PointsContainer} from './components';
import {getMatchSet, getMatchSets} from './services';
import Set from './Set';
import {getScores} from './Set/services';
import Sets from './Sets';
import Stats from './Stats';

interface MatchProps extends RouteComponentProps<any> {
  reduxMatch: MatchType;
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

    this.props.history.push(`/match/${reduxMatch.id}/set/${id}`);
  };

  public render() {
    const {reduxMatch, match} = this.props;

    if (!reduxMatch) {
      return <Redirect to="/" />;
    }

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
              {reduxMatch.opponent} - {reduxMatch.date}
              {!reduxMatch.home && ' (away)'}
            </Headline4>
          </HeaderSegment>

          <Switch>
            <Route
              path={`/match/${reduxMatch.id}/set/:setId`}
              render={() => {
                const setId = match.params.setId;
                const scores = getScores(getMatchSet(setId).stats);

                return (
                  <PointsContainer>
                    <Paragraph3>
                      {reduxMatch.opponent} {scores.opponent}
                    </Paragraph3>
                    <Paragraph3>Us {scores.us}</Paragraph3>
                  </PointsContainer>
                );
              }}
            />
          </Switch>

          <Button
            type={ButtonTypes.primary}
            onClick={() => {
              this.addSet();
            }}
            disabled={!this.canAddSet()}
          >
            Add Set
          </Button>
        </HeaderContainer>
        <Switch>
          <Route
            path={`/match/${reduxMatch.id}/set/:setId`}
            component={() => <Set setId={match.params.setId} />}
          />
          <Route
            path={`/match/${reduxMatch.id}/stats`}
            component={() => <Stats sets={getMatchSets(reduxMatch.id)} />}
          />
          <Route
            render={() => (
              <Sets
                matchId={reduxMatch.id}
                sets={getMatchSets(reduxMatch.id)}
              />
            )}
          />
        </Switch>
      </ContentContainer>
    );
  }
}

export default connect(
  ({matches}: RootState, props: MatchProps) => ({
    reduxMatch: matches[props.match.params.matchId],
  }),
  {
    addSet: addSetAction,
  }
)(Match);
