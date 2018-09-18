import styled from 'react-emotion';
import {colors} from '../../../../../../components/theme';

export const PlayersContainer = styled.div<{courtSwapped: boolean}>(
  ({courtSwapped}) => ({
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid #f5f5f5',
    borderRadius: 10,
    ...(courtSwapped
      ? {borderRight: '5px solid gray'}
      : {borderLeft: '5px solid gray'}),
  })
);

export const PlayerRow = styled.div<{recommended: boolean}>(
  ({recommended}) => ({
    display: 'flex',
    flex: '1 1 45%',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colors.darkCoolGray,
    padding: '0.8em',
    cursor: 'pointer',
    fontWeight: 500,
    opacity: recommended ? 1 : 0.5,
    borderBottom: '1px solid #f5f5f5',
    ':first-child': {
      borderRadius: '10px 0 0 0',
    },
    ':nth-child(2)': {
      borderRadius: '0 10px 0 0',
    },
    ':nth-child(5)': {
      borderRadius: '0 0 0 10px',
    },
    ':last-child': {
      borderRadius: '0 0 10px 0',
    },
    '@media (hover)': {
      ':hover': {
        backgroundColor: '#f5f5f5',
      },
    },
  })
);

export const PlayerImage = styled.img({
  height: '2em',
  width: '2em',
  borderRadius: '2em',
  marginLeft: 48,
  filter: 'brightness(120%)',
});
