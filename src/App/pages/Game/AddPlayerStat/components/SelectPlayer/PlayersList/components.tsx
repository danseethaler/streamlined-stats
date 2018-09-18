import styled from 'react-emotion';
import {colors} from '../../../../../../components/theme';

export const PlayersContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #f5f5f5',
  borderRadius: 10,
});

export const LeftDiv = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const PlayerRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: colors.darkCoolGray,
  padding: '0.2em 0.7em',
  cursor: 'pointer',
  fontWeight: 500,
  borderBottom: '1px solid #f5f5f5',
  ':first-child': {
    borderRadius: '10px 10px 0 0',
  },
  ':last-child': {
    borderRadius: '0 0 10px 10px',
  },
  '@media (hover)': {
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  },
});

export const PlayerImage = styled.img({
  height: '2em',
  width: '2em',
  borderRadius: '2em',
  marginLeft: 48,
  filter: 'brightness(120%)',
});

export const RecommendedPlayer = styled.div<{recommended: boolean}>(
  ({recommended}) => ({
    height: '0.5em',
    width: '0.5em',
    borderRadius: '1em',
    marginRight: '1em',
    backgroundColor: recommended ? colors.primary : null,
  })
);
