import React from 'react';
import {css, keyframes} from 'react-emotion';

const ringKeyframe = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const ring = css({
  display: 'inline-block',
  position: 'relative',
  width: '64px',
  height: '64px',
  '& div': {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    width: '51px',
    height: '51px',
    margin: '6px',
    border: '6px solid #fff',
    borderRadius: '50%',
    animation: `${ringKeyframe} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    borderColor: '#fff transparent transparent transparent',
  },
  '& div:nth-child(1)': {
    animationDelay: '-0.45s',
  },
  '& div:nth-child(2)': {
    animationDelay: '-0.3s',
  },
  '& div:nth-child(3)': {
    animationDelay: '-0.15s',
  },
});

const Spinner = () => (
  <div className={ring}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
