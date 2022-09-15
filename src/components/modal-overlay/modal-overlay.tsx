import s from './modal-overlay.module.css';

type TModalOverlay = {
  closeModal: () => void
}

const ModalOverlay = ({ closeModal }: TModalOverlay) => {
  return (
    <div className={s.overlay} onClick={closeModal} />
  );
};

export default ModalOverlay;