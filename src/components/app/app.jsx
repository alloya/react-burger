import { useEffect } from "react";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Title from "../title/title";
import s from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

const App = () => {
  const dispatch = useDispatch();
  const { ingredientModalOpened, orderModalOpened } = useSelector(store => store.modal);
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);

  useEffect(
    () => {
      dispatch(getIngredients())
    }, [dispatch]
  );

  return (
    <>
      <Header />
      <div className={s.main}>
        <Title text="Собери бургер" />
        {ingredientsRequest && 'Загрузка...'}
        {ingredientsFailed && 'Произошла ошибка'}
        {!ingredientsRequest && !ingredientsFailed && ingredients.length &&
          <div className={s.content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        }
      </div>
      {(ingredientModalOpened || orderModalOpened) &&
        <div className={s.modalWrapper}>
          <Modal>
            {ingredientModalOpened && <IngredientDetails />}
            {orderModalOpened && <OrderDetails />}
          </Modal>
        </div>}
    </>
  );
}

export default App;
