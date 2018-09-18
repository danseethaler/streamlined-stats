import React from 'react';
import {clearState, loadState} from '../../../redux/localStorage';
import {Hr, ShadowDiv} from '../../components/Bits';
import Button, {ButtonTypes} from '../../components/Button';
import download from '../../services/download';
import UpdateState from './components/UpdateState';

const Admin: React.SFC = () => (
  <div>
    <ShadowDiv>
      <Button
        type={ButtonTypes.gray}
        onClick={() => {
          download();
        }}
      >
        Download Data
      </Button>
    </ShadowDiv>

    <ShadowDiv>
      <Button
        type={ButtonTypes.gray}
        onClick={() => {
          const stateString = loadState();
          const textArea = document.getElementById(
            'state_string'
          ) as HTMLTextAreaElement;
          textArea.value = JSON.stringify(stateString, null, 4);
        }}
      >
        Show stored state
      </Button>
      <textarea id="state_string" rows={8} />
    </ShadowDiv>

    <UpdateState />

    <ShadowDiv>
      <Button
        type={ButtonTypes.danger}
        onClick={() => {
          clearState();
          window.location = window.location;
        }}
      >
        Clear stored state
      </Button>
    </ShadowDiv>
  </div>
);

export default Admin;
