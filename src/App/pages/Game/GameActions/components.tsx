import styled from 'react-emotion';
import {colors} from '../../../components/theme';

export const ActionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 220,
  borderRight: `1px solid ${colors.extraLightCoolGray}`,
});

export const ActionHeader = styled.h4({
  padding: 6,
  margin: '15px 0 2px 0',
  backgroundColor: colors.xxLightCoolGray,
});
