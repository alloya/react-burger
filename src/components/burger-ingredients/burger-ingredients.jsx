import { useState, useEffect } from "react";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import s from "./burger-ingredients.module.css";
import styles from "../../utils/styles.module.css";
import IngredientType from "./ingredient-type/ingredient-type";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { randomizeId } from "../../utils/utils";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

const BurgerIngredients = (props) => {
  const dispatch = useDispatch();
  //const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);
  const { ingredients, currentTab } = useSelector(store => store.ingredients);
  // useEffect(
  //   () => {
  //     dispatch(getIngredients())
  //   }, [dispatch]
  // );
  //const data = props.ingredientsData;
  const types = Object.keys(IngredientTypes);
  const [activeState, setState] = useState(types[0]);

  const setScroll = (value) => {
    setState(value);
    document.getElementById(value).scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {ingredients.length && 
      <section className={`${s.ingredients} mr-5`}>
        <IngredientsTab
          typesList={types}
          active={activeState}
          scrollTo={setScroll} />
        <ul className={`${s.ingredientList} ${styles.scrollable} mt-10`}>
          {types.map((item) => (
            <IngredientType
              type={IngredientTypes[item]}
              key={randomizeId()}
            />
          ))}
        </ul>
      </section>}
    </>
  );
}

export default BurgerIngredients;