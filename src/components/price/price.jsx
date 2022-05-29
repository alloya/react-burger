import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../utils/styles.module.css";
import s from "./price.module.css";

const Price = ({ price, size = "default" }) => {
  return (
    <span
      className={`${styles.d_flex} ${styles.justify_center} ${
        styles.align_center
      } ${size === "default" ? s.default : s.medium}`}
    >
      <p className={`text text_type_digits-${size} pr-2`}>{price}</p>
      <CurrencyIcon type="primary" />
    </span>
  );
};

Price.propTypes = {
  price: PropTypes.number,
  size: PropTypes.string,
};

export default Price;
