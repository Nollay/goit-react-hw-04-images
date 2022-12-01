import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const ModalRoot = document.querySelector('#modal-root');

export function ModalWindow({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  });

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>{children}</Modal>
    </Overlay>,
    ModalRoot
  );
}
ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
};
