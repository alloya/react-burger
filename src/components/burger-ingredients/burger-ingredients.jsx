import { useState } from "react";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import s from "./burger-ingredients.module.css";
import styles from "../../utils/styles.module.css";
import IngredientType from "./ingredient-type/ingredient-type";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { randomizeId } from "../../utils/utils";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/prop-types";
import { useSelector } from "react-redux";

const BurgerIngredients = (props) => {
  const { ingredients, currentTab } = useSelector(store => store.ingredients);

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
              openModal={props.openModal}
              getIngredientDetails={props.getDetails}
            />
          ))}
        </ul>
      </section>}
    </>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  //ingredientsData: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired,
  openModal: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired
};