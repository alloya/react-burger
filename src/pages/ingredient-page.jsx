import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { ADD_INGREDIENT_INFO_TO_MODAL } from "../services/actions/ingredient-modal";
import { getIngredients } from "../services/actions/ingredients";

export const IngredientPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredientDetails } = useSelector(store => store.ingredientModal);
  const dispatch = useDispatch();

  const { id } = useParams();

  const getItem = () => {
    if (ingredients.length == 0) {
      dispatch(getIngredients());
    }
    if (Object.keys(ingredientDetails).length === 0) {
      const ingredient = ingredients.filter(el => el._id == id)[0];
      ingredient && dispatch({ type: ADD_INGREDIENT_INFO_TO_MODAL, ingredient });
    }
  }

  useEffect(() => {
    getItem()
  }, [ingredients])

  return (
    <div className="ingredient-page">
      {ingredients && <IngredientDetails />}
    </div>
  )
}