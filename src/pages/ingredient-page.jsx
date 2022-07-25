import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { ADD_INGREDIENT_INFO_TO_MODAL } from "../services/actions/ingredient-modal";
import { getIngredients } from "../services/actions/ingredients";
import { getIngredientsData } from "../utils/api";

export const IngredientPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredientDetails } = useSelector(store => store.ingredientModal);
  const dispatch = useDispatch();

  const { id } = useParams();

  const getItem = async () => {
    if (ingredients.length == 0) {
      console.log('empty')
      const ingredients = await getIngredientsData();
      debugger
      if (Object.keys(ingredientDetails).length === 0) {
        debugger
        const ingredient = {...ingredients.data.filter(el => el._id == id)[0]}
        //const ingredient = {...ingredient1[0]}
        
        ingredient && dispatch({ type: ADD_INGREDIENT_INFO_TO_MODAL, ingredient });
      }
    }
  }

  useEffect(() => {
    getItem()
  }, [])

  return (
    <div className="ingredient-page">
      {ingredients && <IngredientDetails />}
    </div>
  )
}