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

export const Hr = styled.div({
  display: 'block',
  borderBottom: '1px solid #e2e2e2',
  margin: '0.5em 2em',
});

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

export const ShadowDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.white,
  borderRadius: 3,
  margin: '0.5em 1em',
  padding: '0.5em',
  boxShadow: `2px 1px 8px 1px ${colors.boxShadow}`,
});
