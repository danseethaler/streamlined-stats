import styled from 'react-emotion';
import {colors, styles} from '../../../../components/theme';
import {hexToRgb} from '../../../../services/styles';

export const Player = styled.div<{selected: boolean}>(({selected}) => ({
  backgroundColor: selected ? colors.lightCoolGray : colors.white,
  borderBottom: styles.lightBorder,
  padding: '.5em',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: selected
      ? colors.lightCoolGray
      : hexToRgb(colors.white, 1, 0.95),
  },
}));
