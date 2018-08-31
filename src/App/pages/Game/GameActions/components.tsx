import styled from 'react-emotion';
import {colors} from '../../../components/theme';

export const ActionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 220,
  borderRight: `1px solid ${colors.extraLightCoolGray}`,
});

export const ActionSection = styled.div({
  textAlign: 'center',
  marginBottom: 8,
});

export const ActionHeader = styled.h4({
  padding: 6,
  margin: '0 0 4px 0',
  backgroundColor: colors.xxLightCoolGray,
});
