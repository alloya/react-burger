import ModalOverlay from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ onOverlayClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  // Рендерим модалку в соответствующий DOM-элемент
  return ReactDOM.createPortal(
    <>
      
        <div className={`${s.modal} p-10`}>
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