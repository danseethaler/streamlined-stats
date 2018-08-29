import React from 'react';
import {Transition} from 'react-transition-group';
import {TRANSITION_DURATION} from '../constants';

class TransitionHoc extends React.Component<{
  children: (state: string) => any;
  state: string;
}> {
  public state = {
    enteredActive: false,
  };

  public componentDidMount() {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        this.setState({enteredActive: true});
      })
    );
  }

  public render() {
    let {state} = this.props;

    if (!this.state.enteredActive) {
      state = 'exited';
    }
    return this.props.children(state);
  }
}

export default ({children, open}) => (
  <Transition in={open} timeout={TRANSITION_DURATION} unmountOnExit>
    {state => <TransitionHoc state={state}>{children}</TransitionHoc>}
  </Transition>
);
