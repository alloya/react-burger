import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../utils/styles.module.css";
import s from "./price.module.css";

type TPrice = {
  price: number,
  size?: string
}

const Price = ({ price, size = "default" }: TPrice) => {
  return (
    <span
      className={`${styles.d_flex} ${styles.justify_center} ${styles.align_center
        } ${size === "default" ? s.default : s.medium}`}
    >
      <p className={`text text_type_digits-${size} pr-2`}>{price}</p>
      <CurrencyIcon type="primary" />
    </span>
  );
};

export default Price;
