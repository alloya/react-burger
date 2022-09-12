import IngredientsTab from "./ingredients-tab/ingredients-tab";
import s from "./burger-ingredients.module.css";
import styles from "../../utils/styles.module.css";
import IngredientType from "./ingredient-type/ingredient-type";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { useSelector } from "react-redux";
import { TTabType } from "../../services/actions/ingredients";
import { useInView } from "react-intersection-observer";
import { IIngredientState } from "../../services/reducers/ingredient";
import { TRootState } from "../..";

const BurgerIngredients = () => {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector<TRootState, IIngredientState>((store) => store.ingredients);

  const [bunRef, bunInView, bunEntry] = useInView({ threshold: 0.5 });
  const [sauceRef, sauceInView, sauceEntry] = useInView({ threshold: 0.3 });
  const [mainRef, mainIinView, mainEntry] = useInView({ threshold: 0.1 });

  const types = Object.keys(IngredientTypes) as TTabType[];

  return (
    <>
      {ingredientsRequest && "Загрузка..."}
      {ingredientsFailed && "Произошла ошибка"}
      {!ingredientsRequest && !ingredientsFailed && ingredients.length && (
        <section className={`${s.ingredients} mr-5`}>
          <IngredientsTab
            bunInView={bunInView}
            sauceInView={sauceInView}
            mainIinView={mainIinView}
            typesList={types}
          />
          <ul className={`${s.ingredientList} ${styles.scrollable} mt-10`}>
            <IngredientType
              innerRef={bunRef}
              type={IngredientTypes[types[0]]}
            />
            <IngredientType
              innerRef={sauceRef}
              type={IngredientTypes[types[1]]}
            />
            <IngredientType
              innerRef={mainRef}
              type={IngredientTypes[types[2]]}
            />
          </ul>
        </section>
      )}
    </>
  );
};

export default BurgerIngredients;
