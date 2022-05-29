import React from "react";
import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import Price from "../price/price";
import styles from "../../utils/styles.module.css";

export class BurgerConstructor extends React.Component {
  render() {
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
            {ingredients.map((item, index) => (
              <li style={{ display: "flex", alignItems: "center" }}>
                <span className="mr-2">
                  <DragIcon type="primary" />
                </span>
                <div className={s.item}>
                  <ConstructorElement {...item} key={index} />
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
            <Price price={1} size={"medium"} />
          </span>
          <Button type="primary" size="large">
            <p className="text text_type_main-default">Оформить заказ</p>
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;

const ingredients = [
  {
    text: "Мясо бессмертных моллюсков Protostomia",
    price: 1337,
    thumbnail: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    isLocked: false,
  },
  {
    text: "Говяжий метеорит",
    price: 3000,
    thumbnail: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    isLocked: false,
  },
  {
    text: "Краторная булка N-200i (верх)",
    price: 50,
    thumbnail: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  },
  {
    text: "Краторная булка N-200i (верх)",
    price: 50,
    thumbnail: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  },
  {
    text: "Краторная булка N-200i (верх)",
    price: 50,
    thumbnail: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  },
  {
    text: "Краторная булка N-200i (верх)",
    price: 50,
    thumbnail: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  },
];
