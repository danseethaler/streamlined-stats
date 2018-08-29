import styled, {css} from 'react-emotion';
import {TOP_NAV_HEIGHT_EM, TRANSITION_ALL} from '../constants';
import {colors, styles} from '../theme';

const opacityState = {
  entering: 1,
  entered: 1,
  exiting: 0,
  exited: 0,
};

const yTranformState = {
  entering: `translateY(0)`,
  entered: `translateY(0)`,
  exiting: `translateY(1em)`,
  exited: `translateY(1em)`,
};

export const Container = styled.div<{
  transitionState: string;
  pageSized: boolean;
  width: number;
  small: boolean;
}>(
  {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    margin: 'auto',
    backgroundColor: colors.white,
    transition: TRANSITION_ALL,
    boxShadow: styles.lightBoxShadow,
  },
  ({pageSized, width, small}) =>
    pageSized
      ? {
          height: small ? '29.75em' : `calc(100vh - ${TOP_NAV_HEIGHT_EM})`,
          marginTop: small ? `calc(100vh - 29.75em)` : TOP_NAV_HEIGHT_EM,
          width: 650,
        }
      : {
          width,
          maxHeight: '90vh',
          borderRadius: '1em',
        },
  ({transitionState}) => ({
    opacity: opacityState[transitionState],
    transform: yTranformState[transitionState],
  })
);

export const ModalTitle = styled.div({
  height: TOP_NAV_HEIGHT_EM,
  color: colors.darkGray,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  flexShrink: 0,
  fontWeight: 600,
  borderBottom: styles.extraLightGrayBorder,
});

export const ModalContent = styled.div<{pageSized?: boolean}>(
  ({pageSized}) => ({
    padding: pageSized ? 0 : '1em',
    flexGrow: 1,
    overflowY: 'auto',
  })
);

export const modalTitleBorder = css({
  borderBottom: styles.lightBorder,
});

export const ModalFooter = styled.div<{
  pageSized: boolean;
}>(
  {
    borderTop: styles.lightBorder,
    backgroundColor: colors.xxLightCoolGray,
    flexShrink: 0,
    padding: '1em',
  },
  ({pageSized}) =>
    pageSized
      ? {
          backgroundColor: colors.white,
        }
      : {
          borderRadius: '0 0 1em 1em',
        }
);

export const ModalRightIcon = styled.div({
  position: 'absolute',
  right: 0,
  padding: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const ModalLeftIcon = styled.div({
  position: 'absolute',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
