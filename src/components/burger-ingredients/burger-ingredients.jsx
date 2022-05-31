import React from "react";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import s from "./burger-ingredients.module.css";
import styles from "../../utils/styles.module.css";
import ingredientsData from "../../utils/data";
import IngredientType from "./ingredient-type/ingredient-type";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { randomizeId } from "../../utils/utils";

class BurgerIngredients extends React.Component {
  render() {
    const data = ingredientsData;
    const types = Object.keys(IngredientTypes);
    return (
      <>
        <section className={`${s.ingredients} mr-5`}>
          <IngredientsTab />
          <ul className={`${s.ingredientList} ${styles.scrollable} mt-10`}>
            {types.map((item) => (
              <IngredientType
                type={IngredientTypes[item]}
                data={data}
                key={randomizeId()}
              />
            ))}
          </ul>
        </section>
      </>
    );
  }
}

export default BurgerIngredients;
