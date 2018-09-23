import React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../../../redux/reducers';
import {SetType} from '../../../../redux/redux.definitions';
import SpeechToText from '../../../components/SpeechToText';
import StatsList from './StatsList';

interface SetProps {
  setId: string;
  set: SetType;
}

const Set = (props: SetProps) => (
  <React.Fragment>
    <StatsList stats={props.set.stats} />
    <SpeechToText set={props.set} />
  </React.Fragment>
);

export default connect(({sets}: RootState, {setId}: {setId: string}) => ({
  set: sets[setId],
}))(Set);
