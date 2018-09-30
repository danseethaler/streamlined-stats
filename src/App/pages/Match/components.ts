import styled from 'react-emotion';
import {colors, mq, StyleType} from '../../components/theme';

export const PointsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.3em 1em',
});

export const Columns = styled.div<{styleOverrides?: StyleType}>(
  ({styleOverrides}) => ({
    display: 'flex',
    flex: 1,
    [mq.min[1]]: {
      justifyContent: 'space-between',
      '& > *': {
        flex: 1,
      },
    },
    [mq.max[1]]: {
      flexDirection: 'column',
    },
    ...styleOverrides,
  })
);

export const PointSquare = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '2px 8px',
  border: `1px dashed ${colors.boxShadow}`,
  fontFamily: 'monospace',
  '&:first-child': {
    marginRight: 10,
  },
});
