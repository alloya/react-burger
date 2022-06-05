import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "../../../utils/styles.module.css";

const IngredientsTab = (props) => {
  const [current, setCurrent] = React.useState(props.active);
  return (
    <div className={styles.d_flex}>
      <Tab value={props.typesList[0]} active={current === props.typesList[0]} onClick={() => {
        setCurrent(props.typesList[0])
        props.scrollTo(props.typesList[0])
      }}>
        Булки
      </Tab>
      <Tab value={props.typesList[1]} active={current === props.typesList[1]} onClick={() => {
        setCurrent(props.typesList[1])
        props.scrollTo(props.typesList[1])
      }}>
        Соусы
      </Tab>
      <Tab value={props.typesList[2]} active={current === props.typesList[2]} onClick={() => {
        setCurrent(props.typesList[2])
        props.scrollTo(props.typesList[2])
      }}>
        Начинки
      </Tab>
    </div>
  );
};

export default IngredientsTab;
