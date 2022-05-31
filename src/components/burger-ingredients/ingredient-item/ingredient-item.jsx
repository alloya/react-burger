import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../price/price";
import s from "./ingredient-item.module.css";

const IngredientItem = ({ image, price, name, counter }) => {
  return (
    <li className={s.container}>
      {counter && <Counter count={counter} size="small" />}
      <img className={`pb-2`} src={image} alt={name}></img>
      <Price price={price} />
      <p className="text text_type_main-default pt-2 pr-2 pl-2">{name}</p>
    </li>
  );
};

IngredientItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

export default IngredientItem;
