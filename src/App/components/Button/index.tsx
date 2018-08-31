import styled from 'react-emotion';
import {hexToRgb} from '../../services/styles';

export const enum ButtonTypes {
  success = 'success',
  danger = 'danger',
  primary = 'primary',
  info = 'info',
  gray = 'gray',
  accent = 'accent',
}

const colors = {
  success: '#29A88E',
  danger: '#C65F4A',
  primary: '#6DCFD3',
  info: '#FFD035',
  gray: '#5A6E73',
  accent: '#8E83A3',
};

export default styled.button<{type: ButtonTypes}>(props => {
  const backgroundColor = colors[props.type] || colors.gray;

  return {
    backgroundColor,
    fontSize: 16,
    margin: 10,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '10px 20px',
    textAlign: 'center',
    transition: 'all 300ms ease',
    borderRadius: 4,
    color: '#fff',
    boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
    ':hover': {
      backgroundColor: hexToRgb(backgroundColor, 1, 0.8),
      transform: 'translateY(-1px)',
      boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)',
    },
    ':focus': {outline: 0},
    ':active': {
      transform: 'translateY(1px)',
    },
  };
});
