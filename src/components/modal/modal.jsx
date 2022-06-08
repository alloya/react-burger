import ModalOverlay from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onOverlayClick, children }) => {

  const handleEscKeydown = (event) => {
    event.key === "Escape" && onOverlayClick();
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
        <div className={s.closeButton} onClick={onOverlayClick} >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  onOverlayClick: PropTypes.func,
};