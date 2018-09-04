import styled from 'react-emotion';
import {colors, StyleType} from '../theme';

export const ColumnContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

export const Column = styled.div<{flex?: number}>(({flex = 1}) => ({
  flex,
  marginRight: '0.5em',
}));

export const TextInput = styled.input<{styleOverrides?: StyleType}>(
  {
    padding: '0.5em',
    border: `2px solid ${colors.coolGray}`,
    borderRadius: 5,
    marginTop: '0.2em',
    marginBottom: '1em',
    width: '100%',
  },
  ({styleOverrides}) => styleOverrides
);
