import styled from 'react-emotion';

export const ColumnContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

export const Column = styled.div<{flex?: number}>(({flex = 1}) => ({
  flex,
  marginRight: '0.5em',
}));
