import React from 'react';
import {Link} from 'react-router-dom';
import {Hr} from '../../components/Bits';
import Button, {ButtonTypes} from '../../components/Button';
import Modal from '../../components/Modal';
import Matches from './Matches';
import AddMatch from './AddMatch';

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
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            this.setState({addMatchModalOpen: true});
          }}
        >
          New Match
        </Button>
        <Link to="/admin">Admin</Link>
        <Modal
          open={addMatchModalOpen}
          title="Create New Match"
          overlayClickCallback={() => {
            this.setState({addMatchModalOpen: false});
          }}
          content={<AddMatch />}
        />
        <Hr />
        <Matches />
      </div>
    );
  }
}

export default Home;
