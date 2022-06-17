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
import { useMemo, useContext } from "react";
import { ConstructorContext } from '../../services/constructor-context';
import { postOrder } from "../../utils/api";

const BurgerConstructor = (props) => {
  const {constructorItems, setConstructorItems} = useContext(ConstructorContext);

  const countBasket = (ingredients) => {
    if (ingredients.length) {
      return [...buns, ...notBuns].reduce((sum, ingredient) => {
        return sum + ingredient.price
      }, 0)
    }
    return 0;
  }

  const buns = useMemo (() => {
    const bun = constructorItems.find(el => el.type && el.type === IngredientTypes.bun.type);
      return [bun, bun];
    }, [constructorItems]);

  const notBuns = useMemo (() => constructorItems.filter(el => el.type && el.type !== IngredientTypes.bun.type), [constructorItems]);

  const submitOrder = async () => {
    postOrder(constructorItems.map(el => el._id))
      .then(data => {
        props.setOrderNumber(data.order.number);
        props.openModal(true);
      })
      .catch(e => {
        console.log("error", e);
      })
  }

  return (
    <section className={`${s.constructor} ${styles.ml_auto}`}>
      <div className={s.constructorWrapper}>
        <div className={`${styles.mt_0} ${s.bun} pr-5 pb-4`}>
          {buns && buns[0] && <ConstructorElement
            text={buns[0].name + ' (верх)'}
            thumbnail={buns[0].image_mobile}
            price={buns[0].price}
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
                  <ConstructorElement 
                    text={item.name}
                    thumbnail={item.image_mobile}
                    price={item.price}
                   />
                </div>
              </li>
            ))}
          </ul>}
        <div className={`${s.bun} ${styles.mb_0} pr-5 pt-4`}>
        {buns && buns[1] && <ConstructorElement
            text={buns[1].name + ' (низ)'}
            thumbnail={buns[1].image_mobile}
            price={buns[1].price}
            type="bottom"
            isLocked={true}
          />}
        </div>
      </div>
      <div className={`${s.total} pt-10`}>
        <span className="pr-10">
          <Price price={useMemo(() =>countBasket(constructorItems), [constructorItems])} size={"medium"} />
        </span>
        <Button type="primary" size="large" onClick={submitOrder}>
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