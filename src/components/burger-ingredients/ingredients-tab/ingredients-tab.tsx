import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import styles from "../../../utils/styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { switchTab } from "../../../services/actions/ingredients";
import { TAppDispatch, TRootState } from "../../..";
import { IIngredientState } from "../../../services/reducers/ingredient";

interface IIngredientTab {
  bunInView: boolean,
  sauceInView: boolean,
  mainIinView: boolean,
  typesList: string[]
}

const IngredientsTab: React.FC<IIngredientTab> = ({ bunInView, sauceInView, mainIinView, typesList }) => {
  const { currentTab } = useSelector<TRootState, IIngredientState>((store) => store.ingredients);
  const dispatch: TAppDispatch = useDispatch();

  useEffect(() => {
    if (bunInView && sauceInView) {
      dispatch(switchTab(typesList[0]));
    }
    if (sauceInView && !bunInView) {
      dispatch(switchTab(typesList[1]));
    }
    if (mainIinView) {
      dispatch(switchTab(typesList[2]));
    }
  }, [bunInView, sauceInView, mainIinView]);

  const setScroll = (value: string): void => {
    document.getElementById(value)!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.d_flex}>
      <Tab
        active={currentTab === typesList[0]}
        value={'Булки'}
        onClick={() => {
          dispatch(switchTab(typesList[0]));
          setScroll(typesList[0]);
        }}>
        Булки
      </Tab>
      <Tab
        active={currentTab === typesList[1]}
        value={'Соусы'}
        onClick={() => {
          dispatch(switchTab(typesList[1]));
          setScroll(typesList[1]);
        }}>
        Соусы
      </Tab>
      <Tab
        active={currentTab === typesList[2]}
        value={'Начинки'}
        onClick={() => {
          dispatch(switchTab(typesList[2]));
          setScroll(typesList[2]);
        }}>
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientsTab;
