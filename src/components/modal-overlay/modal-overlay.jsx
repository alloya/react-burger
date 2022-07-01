import s from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => {
  return (
    <div className={s.overlay} onClick={closeModal} />
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};