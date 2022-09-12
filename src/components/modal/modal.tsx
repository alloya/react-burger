import ModalOverlay from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

type TModal = {
  closeModal: () => void,
  children: ReactNode
}

const Modal: FC<TModal> = ({ closeModal, children }) => {
  const handleEscKeydown = (event: KeyboardEvent) => {
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
    modalsContainer!
  );
};

export default Modal;