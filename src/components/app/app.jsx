import { useEffect, useState } from "react";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Title from "../title/title";
import s from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getIngredientsData } from "../../utils/api";
import { ConstructorContext } from "../../services/constructor-context";
import { createBurger } from "../../utils/utils";

const App = () => {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [orderNumber, setOrderNumber] = useState(null)

  const [ingredientDetails, setIngredientDetails] = useState({});
  const updateIngredient = (newData) => {
    setIngredientDetails(newData);
  }

  const [constructorItems, setConstructorItems] = useState([]);

  useEffect(() => {
    const ingredientsData = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      getIngredientsData()
        .then(data => {
          setState({ ...state, hasError: false, isLoading: false, data: data.data });
          setConstructorItems(createBurger(data.data));
        })
        .catch(e => {
          console.log("error", e);
          setState({ ...state, hasError: true, isLoading: false, data: [] })
        })
    };
    ingredientsData();
  }, []);

  const { data, isLoading, hasError } = state;

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  return (
    <>
      <Header />
      <div className={s.main}>
        <Title text="Собери бургер" />
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading && !hasError && data.length &&
          <div className={s.content}>
            <BurgerIngredients
              ingredientsData={data}
              openModal={setIsIngredientDetailsOpened}
              getDetails={updateIngredient} />
            <ConstructorContext.Provider value={{constructorItems, setConstructorItems}}>
              <BurgerConstructor
                openModal={setIsOrderDetailsOpened}
                setOrderNumber={setOrderNumber}
              />
            </ConstructorContext.Provider>
          </div>}
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
