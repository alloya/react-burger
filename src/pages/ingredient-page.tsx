import { useEffect } from "react";
import { useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { addIngredientInfoToModal } from "../services/actions/ingredient-modal";
import { useAppDispatch, useAppSelector } from "../services/hooks/appHooks";

interface IParams {
  id: string
}

export const IngredientPage = () => {
  const { ingredients } = useAppSelector(store => store.ingredients);
  const { ingredientDetails } = useAppSelector(store => store.ingredientModal);
  const dispatch = useAppDispatch();
  debugger
  const { id } = useParams<IParams>();

  const getItem = () => {
    if (!ingredientDetails) {
      const ingredient = ingredients.filter(el => el._id == id)[0];
      ingredient && dispatch(addIngredientInfoToModal(ingredient));
    }
  }

  useEffect(() => {
    getItem()
  }, [ingredients])


  return (
    <>
      {ingredientDetails && <div className="ingredient-page">
        <IngredientDetails />
      </div>}
    </>
  )
}