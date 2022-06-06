import s from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={s.overlay} onClick={onClick} />
  );
};

export default ModalOverlay;