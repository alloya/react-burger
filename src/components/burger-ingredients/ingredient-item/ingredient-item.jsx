import PropTypes from "prop-types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../../price/price";
import s from "./ingredient-item.module.css";
import { IngredientPropTypes } from "../../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT_INFO_TO_MODAL } from "../../../services/actions/ingredient-modal";
import { SHOW_INGREDIENT_DETAILS_POPUP } from "../../../services/actions/modal";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import IngredientTypes from "../../../utils/models/ingredient-type-model";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const IngredientItem = ({ ingredient }) => {
  const { constructorItems } = useSelector(store => store.constructor);
  const dispatch = useDispatch();
  const location = useLocation();
  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })
  let counter = useMemo(() => {
    if (constructorItems && constructorItems.length) {
      if (ingredient.type === IngredientTypes.bun.type) {
        return constructorItems.filter(el => el._id === ingredient._id).length * 2;
      }
      return constructorItems.filter(el => el._id === ingredient._id).length;
    }
    else { return 0 };
  }, [constructorItems])

  return (
    <Link
      to={{ pathname: `/ingredient/${ingredient._id}`, state: { background: location } }}
      className={s.no_link} >
      <li className={s.container} ref={ref} onClick={() => {
        dispatch({ type: ADD_INGREDIENT_INFO_TO_MODAL, ingredient });
        dispatch({ type: SHOW_INGREDIENT_DETAILS_POPUP })
      }} style={{ opacity }}>
        {counter !== 0 && <Counter count={counter} size="small" />}
        <img className={`pb-2`} src={ingredient.image} alt={ingredient.name} ></img>
        <Price price={ingredient.price} />
        <p className="text text_type_main-default pt-2 pr-2 pl-2">{ingredient.name}</p>
      </li>
    </Link>
  );
};

IngredientItem.propTypes = {
  ingredient: IngredientPropTypes.isRequired,
  counter: PropTypes.number,
};

export default IngredientItem;
