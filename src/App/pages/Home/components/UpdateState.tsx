import React from 'react';
import {LOCAL_STORAGE_KEY} from '../../../../redux/constants';
import Button, {ButtonTypes} from '../../../components/Button';

const UpdateState = () => (
  <div>
    <textarea id="new-state" />
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
  </div>
);

export default UpdateState;
