import { useSelector } from "react-redux"
import { useLocation } from "react-router";
import IngredientItem from "../components/burger-ingredients/ingredient-item/ingredient-item"

export const IngredientPage = () => {
  const {ingredients} = useSelector(store => store.auth);
  const { location } = useLocation();
  console.log(location)

  return (
    <>
      <IngredientItem />
    </>
  )
}