import ModalOverlay from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onClose, children }) => {

  const handleEscKeydown = (event) => {
    event.key === "Escape" && onClose();
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
        {title && <h3>{title}</h3>}
        <div className={s.closeButton} onClick={onClose} >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};