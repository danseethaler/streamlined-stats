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
