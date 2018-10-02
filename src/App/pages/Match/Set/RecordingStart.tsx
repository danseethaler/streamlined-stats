import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import {updateSetAction} from '../../../../redux/actions/sets';
import {SetType} from '../../../../redux/redux.definitions';
import Button, {ButtonTypes} from '../../../components/Button';
import {Paragraph3} from '../../../components/Typography';

interface RecordingStartProps {
  set: SetType;
  updateSet: (setId: string, set: Partial<SetType>) => void;
}

const RecordingStart = ({set, updateSet}: RecordingStartProps) => (
  <div>
    <Button
      type={ButtonTypes.primary}
      onClick={() => {
        const updates = {recordingStartTime: Date.now()};
        updateSet(set.id, updates);
      }}
    >
      Start Recording
    </Button>
    {set.recordingStartTime && (
      <Paragraph3>
        Start Time: {moment(set.recordingStartTime).format('h:mma')}
      </Paragraph3>
    )}
  </div>
);

export default connect(
  null,
  {updateSet: updateSetAction}
)(RecordingStart);
