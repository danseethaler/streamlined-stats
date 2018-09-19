import React from 'react';
import styled from 'react-emotion';
import {IconType} from 'react-icons';
import {TRANSITION_ALL} from '../constants';
import {colors, styles} from '../theme';

const StyledBackButton = styled.button({
  background: styles.primaryButtonBackground,
  border: 'none',
  borderRadius: '2em',
  width: 250,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px 10px',
  color: 'white',
  letterSpacing: '2px',
  marginTop: '0.5em',
  transition: TRANSITION_ALL,
  '@media (hover)': {
    ':hover': {
      opacity: 0.75,
    },
  },
});

const SpanSpacer = styled.span<{
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}>(({left = null, right = null, top = null, bottom = null}) => ({
  marginLeft: left,
  marginRight: right,
  marginTop: top,
  marginBottom: bottom,
  fontSize: '1.2em',
}));

const ButtonNew: React.SFC<{
  icon?: IconType;
  text?: string;
  onClick: () => void;
}> = ({icon: Icon, text, onClick}) => (
  <StyledBackButton onClick={onClick}>
    {Icon && <Icon color={colors.white} size={24} />}
    {text && <SpanSpacer left={12}>{text}</SpanSpacer>}
  </StyledBackButton>
);

export default ButtonNew;
