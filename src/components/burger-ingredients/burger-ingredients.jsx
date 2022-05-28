import React from "react";
import IngredientsTab from "./ingredients-tab/ingredients-tab";
import s from "./burger-ingredients.module.css";
import Scrollbar from "../scrollbar/scrollbar";
import ingredientsData from "../../utils/data";
import IngredientType from "./ingredient-type/ingredient-type";
import IngredientTypes from "../models/ingredient-type-model";

class BurgerIngredients extends React.Component {
  render() {
    const data = ingredientsData;
    const types = Object.keys(IngredientTypes);
    return (
      <>
        <section className={`${s.ingredients} mr-5`}>
          <IngredientsTab />
          <Scrollbar />
          {types.map((item, index) => (
            <IngredientType
              type={IngredientTypes[item]}
              data={data}
              key={index}
            />
          ))}
        </section>
      </>
    );
  }
}

export default BurgerIngredients;
