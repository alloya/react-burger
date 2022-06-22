import { useEffect, useState } from "react";
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
  const modal = useSelector(store => store.modal);
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);

  useEffect(
    () => {
      dispatch(getIngredients())
    }, [dispatch]
  );


  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const [orderNumber, setOrderNumber] = useState(null)

  const [ingredientDetails, setIngredientDetails] = useState({});
  const updateIngredient = (newData) => {
    setIngredientDetails(newData);
  }

  const [constructorItems, setConstructorItems] = useState([]);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  return (
    <>
      <Header />
      <div className={s.main}>
        <Title text="Собери бургер" />
        {ingredientsRequest && 'Загрузка...'}
        {ingredientsFailed && 'Произошла ошибка'}
        {!ingredientsRequest && !ingredientsFailed && ingredients.length &&
          <div className={s.content}>
            <BurgerIngredients
              openModal={setIsIngredientDetailsOpened}
              getDetails={updateIngredient} />
            <BurgerConstructor
              openModal={setIsOrderDetailsOpened}
              setOrderNumber={setOrderNumber}
            />
          </div>
        }
      </div>
      {(isIngredientDetailsOpened || isOrderDetailsOpened) &&
        <div className={s.modalWrapper}>
          <Modal
            onClose={closeAllModals}
          >
            {isIngredientDetailsOpened && <IngredientDetails ingredient={ingredientDetails} />}
            {isOrderDetailsOpened && <OrderDetails orderNumber={orderNumber} />}
          </Modal>
        </div>}
    </>
  );
}

export default App;
