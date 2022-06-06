import s from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={s.overlay} onClick={onClick} />
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
};