import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { TRootState } from "..";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { addIngredientInfoToModal } from "../services/actions/ingredient-modal";
import { IIngredientState } from "../services/reducers/ingredient";
import { IIngredientModalState } from "../services/reducers/ingredient-modal";

interface IParams {
  id: string
}

export const IngredientPage = () => {
  const { ingredients } = useSelector<TRootState, IIngredientState>(store => store.ingredients);
  const { ingredientDetails } = useSelector<TRootState, IIngredientModalState>(store => store.ingredientModal);
  const dispatch = useDispatch();

  const { id } = useParams<IParams>();

  const getItem = () => {
    if (ingredientDetails && Object.keys(ingredientDetails).length === 0) {
      const ingredient = ingredients.filter(el => el._id == id)[0];
      ingredient && dispatch(addIngredientInfoToModal(ingredient));
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