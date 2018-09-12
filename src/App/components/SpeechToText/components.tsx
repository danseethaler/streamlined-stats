import React from 'react';
import Button, {ButtonTypes} from '../Button';
import {colors} from '../theme';

export const Microphone = ({active, onClick, children}) => (
  <Button
    onClick={onClick}
    type={ButtonTypes.success}
    style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      padding: '13px 16px',
      backgroundColor: active ? colors.purple : colors.extraLightCoolGray,
      color: colors.white,
      borderRadius: 48,
    }}
  >
    {children}
  </Button>
);
