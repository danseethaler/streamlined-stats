import styled from 'react-emotion';
import {colors} from '../../components/theme';

export const PointsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.3em 1em',
});

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
