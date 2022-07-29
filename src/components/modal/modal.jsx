import ModalOverlay from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({ closeModal, children }) => {
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  });

  return ReactDOM.createPortal(
    <>
      <div className={`${s.modal} p-10`}>
        <div className={s.closeButton} onClick={closeModal} >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalsContainer
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired
};