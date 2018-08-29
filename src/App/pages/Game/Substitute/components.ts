import styled from 'react-emotion';
import {colors, styles} from '../../../components/theme';

export const ColumnContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

export const Column = styled.div({
  flex: 1,
});

export const Player = styled.div<{selected: boolean}>(({selected}) => ({
  backgroundColor: selected ? colors.primary : colors.white,
  borderBottom: styles.lightBorder,
  padding: '.5em',
  cursor: 'pointer',
}));
