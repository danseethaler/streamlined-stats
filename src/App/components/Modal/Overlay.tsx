import * as React from 'react';
import styled from 'react-emotion';
import {hexToRgb} from '../../services/styles';
import {TRANSITION_DURATION} from '../constants';
import {colors} from '../theme';

const Overlay = styled.div<{
  opacity?: number;
}>(({opacity = 0}) => ({
  position: 'fixed',
  display: 'flex',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  transition: `all ${TRANSITION_DURATION}ms`,
  backgroundColor: hexToRgb(colors.extraDarkGray, opacity),
  zIndex: 100,
}));

const opacityState = {
  entering: 0.5,
  entered: 0.5,
  exiting: 0,
  exited: 0,
};

export default ({onClick, state, children}) => (
  <Overlay
    opacity={opacityState[state]}
    onClick={e => {
      e.stopPropagation();
      onClick();
    }}
  >
    {children}
  </Overlay>
);
