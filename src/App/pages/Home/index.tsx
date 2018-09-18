import React from 'react';
import {Link} from 'react-router-dom';
import {Hr} from '../../components/Bits';
import Button, {ButtonTypes} from '../../components/Button';
import Modal from '../../components/Modal';
import AddGame from './AddGame';
import Games from './Games';

interface HomeState {
  addGameModalOpen: boolean;
  stateString: string;
}

class Home extends React.Component<{}, HomeState> {
  public state = {
    addGameModalOpen: false,
    stateString: '',
  };

  public render() {
    const {addGameModalOpen} = this.state;

    return (
      <div>
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            this.setState({addGameModalOpen: true});
          }}
        >
          New Set
        </Button>
        <Link to="/admin">Admin</Link>
        <Modal
          open={addGameModalOpen}
          title="Add Set"
          overlayClickCallback={() => {
            this.setState({addGameModalOpen: false});
          }}
          content={<AddGame />}
        />
        <Hr />
        <Games />
      </div>
    );
  }
}

export default Home;
