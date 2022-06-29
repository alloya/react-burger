import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../price/price";
import s from "./ingredient-item.module.css";
import { IngredientPropTypes } from "../../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT_INFO_TO_MODAL } from "../../../services/actions/ingredient-modal";
import { SHOW_INGREDIENT_DETAILS_POPUP } from "../../../services/actions/modal";
import { useDrag } from "react-dnd";

const IngredientItem = (props) => {
  const ingredient = props.ingredient;
  const id = ingredient._id;
  let counter = props.counter;
  const dispatch = useDispatch();
  const [{ opacity }, ref ] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <li className={s.container} onClick={() => {
      dispatch({type: ADD_INGREDIENT_INFO_TO_MODAL, ingredient});
      dispatch({type: SHOW_INGREDIENT_DETAILS_POPUP})
    }}style={{ opacity }}>
      {counter && <Counter count={counter} size="small" />}
      <img className={`pb-2`} src={ingredient.image} alt={ingredient.name}  ref={ref} ></img>
      <Price price={ingredient.price} />
      <p className="text text_type_main-default pt-2 pr-2 pl-2">{ingredient.name}</p>
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
  counter: PropTypes.number,
};

export default IngredientItem;
