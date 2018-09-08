import React from 'react';
import styled from 'react-emotion';
import {IoIosArrowRoundBack} from 'react-icons/io';
import {TRANSITION_ALL} from '../constants';
import {colors, styles} from '../theme';

const StyledBackButton = styled.button({
  background: styles.primaryButtonBackground,
  border: 'none',
  borderRadius: '2em',
  minWidth: '250px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '10px 30px',
  color: 'white',
  letterSpacing: '2px',
  marginTop: '0.5em',
  transition: TRANSITION_ALL,
  ':hover': {
    opacity: 0.75,
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

const ButtonNew: React.SFC<{text: string; onClick: () => void}> = ({
  text,
  onClick,
}) => (
  <StyledBackButton onClick={onClick}>
    <IoIosArrowRoundBack color={colors.white} size={34} />
    <SpanSpacer left={12}>{text}</SpanSpacer>
  </StyledBackButton>
);
export default ButtonNew;
