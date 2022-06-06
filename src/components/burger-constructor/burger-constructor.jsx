import ingredients from "../../utils/data";
import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import Price from "../price/price";
import styles from "../../utils/styles.module.css";
import { randomizeId } from "../../utils/utils";
import PropTypes from "prop-types";

const BurgerConstructor = (props) => {
  const countBasket = (ingredients) => {
    return ingredients.reduce((sum, ingredient) => {
      return sum + ingredient.price
    }, 400)
  }
  return (
    <section className={`${s.constructor} ${styles.ml_auto}`}>
      <div className={s.constructorWrapper}>
        <div className={`${styles.mt_0} ${styles.ml_auto} pr-3 pb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
        <ul className={`${s.constructorContainer} ${styles.scrollable} pr-2`}>
          {ingredients.map((item) => (
            <li
              className={`${styles.align_center} ${styles.d_flex}`}
              key={randomizeId()}
            >
              <span className="mr-2">
                <DragIcon type="primary" />
              </span>
              <div className={s.item}>
                <ConstructorElement {...item} />
              </div>
            </li>
          ))}
        </ul>
        <div className={`${styles.ml_auto} ${styles.mb_0} pr-3 pt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          />
        </div>
      </div>
      <div className={`${s.total} pt-10`}>
        <span className="pr-10">
          <Price price={countBasket(ingredients)} size={"medium"} />
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