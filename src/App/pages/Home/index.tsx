import React from 'react';
import {clearState, loadState} from '../../../redux/localStorage';
import Modal from '../../components/Modal';
import Games from '../Games';
import AddGame from './AddGame';

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
        <button
          onClick={() => {
            this.setState({addGameModalOpen: true});
          }}
        >
          New Set
        </button>
        <button
          onClick={() => {
            const state = loadState();
            console.log(JSON.stringify(state, null, 4));
          }}
        >
          Show stored state
        </button>
        <button
          onClick={() => {
            clearState();
            window.location = window.location;
          }}
        >
          Clear stored state
        </button>
        <Modal
          open={addGameModalOpen}
          overlayClickCallback={() => {
            this.setState({addGameModalOpen: false});
          }}
          content={<AddGame />}
        />
      </div>
    );
  }
}

export default Home;
