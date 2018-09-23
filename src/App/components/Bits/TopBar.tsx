import styled from 'react-emotion';

export const TOP_BAR_HEIGHT = 64;

export const HeaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  padding: '0.2em',
  top: '0',
  left: '0',
  right: '0',
});

export const HeaderSegment = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
