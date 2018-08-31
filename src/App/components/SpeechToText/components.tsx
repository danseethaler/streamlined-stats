import React from 'react';
import Button, {ButtonTypes} from '../Button';
import {colors} from '../theme';

export const Microphone = ({onClick, children}) => (
  <Button
    onClick={onClick}
    type={ButtonTypes.success}
    style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      padding: 24,
      backgroundColor: colors.secondary,
      color: colors.white,
      borderRadius: 48,
    }}
  >
    {children}
  </Button>
);
