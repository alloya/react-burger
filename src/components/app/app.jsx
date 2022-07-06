import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Title from "../title/title";
import s from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { REMOVE_INGREDIENT_INFO_TO_MODAL } from "../../services/actions/ingredient-modal";
import { CLOSE_ALL_POPUPS } from "../../services/actions/modal";

const App = () => {
  const { ingredientModalOpened, orderModalOpened } = useSelector(store => store.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    if (ingredientModalOpened) {
      dispatch({type: REMOVE_INGREDIENT_INFO_TO_MODAL});
    }
    dispatch({type: CLOSE_ALL_POPUPS})
  }

  return (
    <>
      <Header />
      <div className={s.main}>
        <Title text="Собери бургер" />
        <div className={s.content}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </div>
      {(ingredientModalOpened || orderModalOpened) &&
        <div className={s.modalWrapper}>
          <Modal closeModal={closeModal}>
            {ingredientModalOpened && <IngredientDetails/>}
            {orderModalOpened && <OrderDetails/>}
          </Modal>
        </div>}
    </>
  );
}

export default App;
