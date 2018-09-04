import React from 'react';
import {clearState, loadState} from '../../../redux/localStorage';
import Button, {ButtonTypes} from '../../components/Button';
import Modal from '../../components/Modal';
import download from '../../services/download';
import AddGame from './AddGame';
import UpdateState from './components/UpdateState';
import Games from './Games';

interface HomeState {
  addGameModalOpen: boolean;
}

class Home extends React.Component<{}, HomeState> {
  public state = {
    addGameModalOpen: false,
  };

  public render() {
    const {addGameModalOpen} = this.state;

    return (
      <div>
        <Games />
        <Button
          type={ButtonTypes.primary}
          onClick={() => {
            this.setState({addGameModalOpen: true});
          }}
        >
          New Set
        </Button>
        <Button
          type={ButtonTypes.gray}
          onClick={() => {
            const state = loadState();
            console.log(JSON.stringify(state, null, 4));
          }}
        >
          Show stored state
        </Button>
        <Button
          type={ButtonTypes.danger}
          onClick={() => {
            clearState();
            window.location = window.location;
          }}
        >
          Clear stored state
        </Button>
        <Button
          type={ButtonTypes.gray}
          onClick={() => {
            download();
          }}
        >
          Download Data
        </Button>
        <Modal
          open={addGameModalOpen}
          title="Add Set"
          overlayClickCallback={() => {
            this.setState({addGameModalOpen: !this.state.addGameModalOpen});
          }}
          content={<AddGame />}
        />
        <hr />
        <UpdateState />
      </div>
    );
  }
}

export default Home;
