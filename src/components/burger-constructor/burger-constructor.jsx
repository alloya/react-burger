import ingredients from "../../utils/data";
import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import Price from "../price/price";
import styles from "../../utils/styles.module.css";
import PropTypes from "prop-types";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { useMemo } from "react";

const BurgerConstructor = (props) => {
  const countBasket = (ingredients) => {
    return ingredients.reduce((sum, ingredient) => {
      return sum + ingredient.price
    }, 0)
  }

  const buns = useMemo (() => ingredients.filter(el => el.type && el.type === IngredientTypes.bun.type), [ingredients]);

  const notBuns = useMemo (() => ingredients.filter(el => el.type && el.type !== IngredientTypes.bun.type), [ingredients]);

  return (
    <section className={`${s.constructor} ${styles.ml_auto}`}>
      <div className={s.constructorWrapper}>
        <div className={`${styles.mt_0} ${s.bun} pr-5 pb-4`}>
          {buns && buns[0] && <ConstructorElement
            {...buns[0]}
            type="top"
            isLocked={true}
          />}
        </div>
        {notBuns && notBuns.length &&
          <ul className={`${s.constructorContainer} ${styles.scrollable} pr-2`}>
            {notBuns.map((item, index) => (
              <li
                className={`${styles.align_center} ${styles.d_flex}`}
                key={index}
              >
                <span className="mr-2">
                  <DragIcon type="primary" />
                </span>
                <div className={s.item}>
                  <ConstructorElement {...item} />
                </div>
              </li>
            ))}
          </ul>}
        <div className={`${s.bun} ${styles.mb_0} pr-5 pt-4`}>
        {buns && buns[1] && <ConstructorElement
            {...buns[1]}
            type="bottom"
            isLocked={true}
          />}
        </div>
      </div>
      <div className={`${s.total} pt-10`}>
        <span className="pr-10">
          <Price price={useMemo(() =>countBasket(ingredients), [ingredients])} size={"medium"} />
        </span>
        <Button type="primary" size="large" onClick={props.openModal}>
          <p className="text text_type_main-default">Оформить заказ</p>
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;