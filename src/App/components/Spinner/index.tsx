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

const getRingClassName = (size, color) =>
  css({
    display: 'inline-block',
    position: 'relative',
    width: size * 1.2,
    height: size * 1.2,
    '& div': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      width: size,
      height: size,
      margin: size / 10.16,
      border: `${size / 10.16}px solid #fff`,
      borderRadius: '50%',
      animation: `${ringKeyframe} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
      borderColor: `${color} transparent transparent transparent`,
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

const Spinner = ({size = 51, color = '#fff', className = ''}) => (
  <div className={getRingClassName(size, color) + ' ' + className}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
