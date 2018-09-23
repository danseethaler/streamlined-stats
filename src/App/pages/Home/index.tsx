import React from 'react';
import {Link} from 'react-router-dom';
import {ContentContainer} from '../../components/Bits/ContentContainer';
import {HeaderContainer} from '../../components/Bits/TopBar';
import Button, {ButtonTypes} from '../../components/Button';
import Modal from '../../components/Modal';
import AddMatch from './AddMatch';
import Matches from './Matches';

interface HomeState {
  addMatchModalOpen: boolean;
}

class Home extends React.Component<{}, HomeState> {
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
        </ContentContainer>
      </div>
    );
  }
}

export default Home;
