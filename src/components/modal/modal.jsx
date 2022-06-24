import ModalOverlay from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_ALL_POPUPS } from '../../services/actions/modal';
import { REMOVE_INGREDIENT_INFO_TO_MODAL } from '../../services/actions/ingredient-modal';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ children }) => {

  const { ingredientModalOpened, orderModalOpened } = useSelector(store => store.modal);
  console.log(ingredientModalOpened, orderModalOpened)
  const dispatch = useDispatch();

  const closeModal = () => {
    if (ingredientModalOpened) {
      dispatch({type: REMOVE_INGREDIENT_INFO_TO_MODAL});
    }
    dispatch({type: CLOSE_ALL_POPUPS})
  }

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
      <ModalOverlay onClick={closeModal} />
    </>,
    modalsContainer
  );
};

export default Modal;