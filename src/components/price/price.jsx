import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../utils/common.module.css";

const Price = ({ price, size }) => {
  const fontSize = size ? size : "default";
  return (
    <div className={`${styles.d_flex} ${styles.justify_center}`}>
      <p className={`text text_type_digits-${fontSize} pr-2`}>{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number,
  size: PropTypes.string,
};

export default Price;
