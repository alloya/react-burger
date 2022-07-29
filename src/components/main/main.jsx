import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Title from "../title/title";
import s from "./main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';


const MainPage = () => {

  return (
    <div className={s.main}>
      <Title text="Собери бургер" />
      <div className={s.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
}

export default MainPage;
