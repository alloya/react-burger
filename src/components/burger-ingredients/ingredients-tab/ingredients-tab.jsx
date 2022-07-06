import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import styles from "../../../utils/styles.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { TAB_SWITCH } from "../../../services/actions/ingredients";

const IngredientsTab = ({ bunInView, sauseInView, mainIinView, typesList }) => {
  const { currentTab } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (bunInView && sauseInView) {
        dispatch({ type: TAB_SWITCH, payload: (typesList[0]) })
      }
      if (sauseInView && !bunInView) {
        dispatch({ type: TAB_SWITCH, payload: (typesList[1]) })
      }
      if (mainIinView) {
        dispatch({ type: TAB_SWITCH, payload: (typesList[2]) })
      }
    }, [bunInView, sauseInView, mainIinView]
  );

  const setScroll = (value) => {
    document.getElementById(value).scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={styles.d_flex}>
      <Tab
        active={currentTab === typesList[0]}
        onClick={() => {
          dispatch({ type: TAB_SWITCH, payload: (typesList[0]) })
          setScroll(typesList[0])
        }}>
        Булки
      </Tab>
      <Tab
        active={currentTab === typesList[1]}
        onClick={() => {
          dispatch({ type: TAB_SWITCH, payload: (typesList[1]) })
          setScroll(typesList[1])
        }}>
        Соусы
      </Tab>
      <Tab
        active={currentTab === typesList[2]}
        onClick={() => {
          dispatch({ type: TAB_SWITCH, payload: (typesList[2]) })
          setScroll(typesList[2])
        }}>
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientsTab;
