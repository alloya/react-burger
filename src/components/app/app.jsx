import React, { useEffect } from "react";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Title from "../title/title";
import s from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const App = () => {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [ingredientDetails, setIngredientDetails] = React.useState({});
  const updateIngredient = (newData) => {
    setIngredientDetails(newData);
  }
  useEffect(() => {
    const ingredientsData = async () => {
      setState({...state, hasError: false, isLoading: true});
      try {
        await fetch('https://norma.nomoreparties.space/api/ingredients')
        .then(res => {
          return res.json()
        })
        .then(data => {
          setState({...state, hasError: false, isLoading: false, data: data.data})
        })
      } catch(e) {
        console.log("error", e);
      }
    };
    ingredientsData();
  }, []);
  const { data, isLoading, hasError } = state;

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
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
          <BurgerConstructor
            openModal={setIsOrderDetailsOpened}
          />
        </div>}
      </div>
      {(isIngredientDetailsOpened || isOrderDetailsOpened) &&
        <div className={s.modalWrapper}>
          <Modal
            onOverlayClick={closeAllModals}
            onEscKeydown={handleEscKeydown}
          >
            {isIngredientDetailsOpened && <IngredientDetails {...ingredientDetails} />}
            {isOrderDetailsOpened && <OrderDetails />}
          </Modal>
        </div>}
    </>
  );
}

export default App;
