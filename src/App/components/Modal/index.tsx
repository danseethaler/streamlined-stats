import {noop} from 'lodash';
import * as React from 'react';
import Transition from '../Transition';
import {
  Container,
  ModalContent,
  ModalFooter,
  ModalLeftIcon,
  ModalRightIcon,
  ModalTitle,
} from './components';
import Overlay from './Overlay';

interface Props {
  open: boolean;
  content: React.ReactNode;
  footer?: JSX.Element;
  topLeftIcon?: JSX.Element;
  title?: string;
  pageSized?: boolean;
  exitClickCallback?: () => void;
  overlayClickCallback?: () => void;
  width?: number;
  small?: boolean;
}

const CloseIcon = () => <span>X</span>;

export default ({
  open,
  content,
  footer,
  topLeftIcon,
  title,
  pageSized,
  exitClickCallback,
  overlayClickCallback = noop,
  width = 360,
  small,
}: Props) => (
  <Transition open={open}>
    {state => {
      return (
        <Overlay state={state} onClick={overlayClickCallback}>
          <Container
            transitionState={state}
            pageSized={pageSized}
            onClick={e => {
              e.stopPropagation();
            }}
            width={width}
            small={small}
          >
            {title && <ModalTitle>{title}</ModalTitle>}
            {exitClickCallback && (
              <ModalRightIcon onClick={exitClickCallback}>
                <CloseIcon />
              </ModalRightIcon>
            )}
            {topLeftIcon && <ModalLeftIcon>{topLeftIcon}</ModalLeftIcon>}
            <ModalContent pageSized={pageSized}>{content}</ModalContent>
            {footer && (
              <ModalFooter pageSized={pageSized}>{footer}</ModalFooter>
            )}
          </Container>
        </Overlay>
      );
    }}
  </Transition>
);
