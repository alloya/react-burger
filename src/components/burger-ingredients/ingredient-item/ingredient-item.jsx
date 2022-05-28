import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../price/price";
import s from "./ingredient-item.module.css";

const IngredientItem = ({ image, price, name, counter }) => {
  return (
    <div className={s.container}>
      {counter && <Counter count={counter} size="small" />}
      <img className={`pb-2`} src={image} alt=""></img>
      <Price price={price} />
      <p className="text text_type_main-default pt-2">{name}</p>
    </div>
  );
};

IngredientItem.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

export default IngredientItem;
