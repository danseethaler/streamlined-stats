import {values} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {RootState} from '../../../redux/reducers';
import {SetsType} from '../../../redux/redux.definitions';
import {ContentContainer} from '../../components/Bits/ContentContainer';
import {HeaderContainer} from '../../components/Bits/TopBar';
import Button, {ButtonTypes} from '../../components/Button';
import LeaderBoard from '../../components/LeaderBoard';
import Modal from '../../components/Modal';
import AddMatch from './AddMatch';
import Matches from './Matches';

interface HomeProps {
  sets: SetsType;
}

interface HomeState {
  addMatchModalOpen: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  public state = {
    addMatchModalOpen: false,
  };

  public render() {
    const {addMatchModalOpen} = this.state;

    return (
      <div>
        <HeaderContainer>
          <div>
            <Button
              type={ButtonTypes.primary}
              onClick={() => {
                this.setState({addMatchModalOpen: true});
              }}
            >
              New Match
            </Button>
            <Link to="/admin">Admin</Link>
            <Link style={{marginLeft: '1em'}} to="/stats-info">
              Stats Info
            </Link>
          </div>
        </HeaderContainer>
        <Modal
          open={addMatchModalOpen}
          title="Create New Match"
          overlayClickCallback={() => {
            this.setState({addMatchModalOpen: false});
          }}
          content={<AddMatch />}
        />
        <ContentContainer>
          <Matches />
          <LeaderBoard sets={values(this.props.sets)} />
        </ContentContainer>
      </div>
    );
  }
}

export default connect(({sets}: RootState) => ({sets}))(Home);
