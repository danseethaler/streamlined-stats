import React from 'react';
import {LOCAL_STORAGE_KEY} from '../../../../redux/constants';
import {ShadowDiv} from '../../../components/Bits';
import Button, {ButtonTypes} from '../../../components/Button';

const UpdateState = () => (
  <ShadowDiv>
    <textarea id="new-state" rows={8} />
    <Button
      type={ButtonTypes.gray}
      onClick={() => {
        const stateValue = (document.getElementById(
          'new-state'
        ) as HTMLTextAreaElement).value;

        localStorage.setItem(LOCAL_STORAGE_KEY, stateValue);
        window.location = window.location;
      }}
    >
      Update State Data
    </Button>
  </ShadowDiv>
);

export default UpdateState;
