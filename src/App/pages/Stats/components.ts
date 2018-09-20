import styled from 'react-emotion';
import {colors} from '../../components/theme';

export const Table = styled.table({
  width: '100%',
  textAlign: 'left',
});

export const Td = styled.td({
  padding: 6,
  border: `1px solid ${colors.xxLightCoolGray}`,
});

export const ThSticky = styled.th<{offset?: number}>(({offset = 0}) => ({
  backgroundColor: '#e0e0e0',
  position: 'sticky',
  top: offset,
  zIndex: 10,
}));
