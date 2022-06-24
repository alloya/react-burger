import {
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import Price from "../price/price";
import styles from "../../utils/styles.module.css";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { useMemo, useEffect } from "react";
import { postOrder } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { createBurger } from "../../utils/utils";
import { FILL_CONSTRUCTOR } from "../../services/actions/constructor";
import { SHOW_ORDER_DETAILS_POPUP } from "../../services/actions/modal";
import { ADD_ORDER_NUMBER_TO_MODAL } from "../../services/actions/orderModal";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const { constructorItems } = useSelector(store => store.constructor);

  useEffect(
    () => {
      const elements = createBurger(ingredients);
      dispatch({type: FILL_CONSTRUCTOR, elements})
    }, [ingredients]
  )

  const countBasket = (ingredients) => {
    if (ingredients && ingredients.length) {
      return [...buns, ...notBuns].reduce((sum, ingredient) => {
        return sum + ingredient.price
      }, 0)
    }
    return 0;
  }

  const buns = useMemo (() => {
    if (constructorItems && constructorItems.length) {
      const bun = constructorItems.find(el => el.type && el.type === IngredientTypes.bun.type);
      return [bun, bun];
    }
    return null;
  }, [constructorItems]);

  const notBuns = useMemo (() => {
    if (constructorItems && constructorItems.length) {
      return constructorItems.filter(el => el.type && el.type !== IngredientTypes.bun.type)
    }
    return null;
  }, [constructorItems]);

  const submitOrder = async () => {
    postOrder(constructorItems.map(el => el._id))
      .then(data => {
        debugger
        dispatch({type: ADD_ORDER_NUMBER_TO_MODAL, data})
        dispatch({type: SHOW_ORDER_DETAILS_POPUP})
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

export default BurgerConstructor;