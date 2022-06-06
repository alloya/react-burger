import React from "react";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Title from "../title/title";

import s from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";



const App = () => {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);

  const [ingredientDetails, setIngredientDetails] = React.useState({});

  const updateIngredient = (newData) => {
    setIngredientDetails(newData);
  }

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
        <div className={s.content}>
          <BurgerIngredients 
            openModal={setIsIngredientDetailsOpened} 
            getDetails={updateIngredient} />
          <BurgerConstructor />
        </div>
      </div>
      {isIngredientDetailsOpened &&
        <Modal
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <IngredientDetails {...ingredientDetails} /> {/* вложенное содержимое, идет в пропс children */}
        </Modal>}
    </>
  );
}

export default App;
