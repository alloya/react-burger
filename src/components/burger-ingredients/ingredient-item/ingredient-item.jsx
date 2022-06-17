import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../price/price";
import s from "./ingredient-item.module.css";
import { IngredientPropTypes } from "../../../utils/prop-types";

const IngredientItem = (props) => {
  const ingredient = props.ingredient;
  const openModal = props.openModal;
  const getIngredientDetails = props.getIngredientDetails;
  let counter = props.counter;

  return (
    <li className={s.container} onClick={() => {
      getIngredientDetails(ingredient);
      openModal(true);
    }}>
      {counter && <Counter count={counter} size="small" />}
      <img className={`pb-2`} src={ingredient.image} alt={ingredient.name}></img>
      <Price price={ingredient.price} />
      <p className="text text_type_main-default pt-2 pr-2 pl-2">{ingredient.name}</p>
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
  openModal: PropTypes.func.isRequired,
  counter: PropTypes.number,
  getIngredientDetails: PropTypes.func.isRequired
};

export default IngredientItem;
