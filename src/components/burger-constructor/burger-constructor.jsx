import {
  Button,
  ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import Price from "../price/price";
import styles from "../../utils/styles.module.css";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { useMemo } from "react";
import { postOrder } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, clearConstructor } from "../../services/actions/constructor";
import { SHOW_ORDER_DETAILS_POPUP } from "../../services/actions/modal";
import { ADD_ORDER_NUMBER_TO_MODAL } from "../../services/actions/orderModal";
import { useDrop } from "react-dnd";
import { DraggableConstructorItem } from "./draggable-constructor-item/draggable-constructor-item";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorItems } = useSelector(store => store.constructor);

  const [, dropTarget] = useDrop({
    accept: ['ingredient'],
    drop(element) {
      dispatch(addIngredient(element))
    }
  })

  const countBasket = (ingredients) => {
    if (ingredients && ingredients.length) {
      return ingredients.reduce((sum, ingredient) => {
        if (ingredient.type === IngredientTypes.bun.type) {
          return sum + ingredient.price * 2;
        }
        return sum + ingredient.price
      }, 0)
    }
    return 0;
  }

  const submitOrder = async () => {
    postOrder(constructorItems.map(el => el._id))
      .then(data => {
        dispatch({ type: ADD_ORDER_NUMBER_TO_MODAL, data })
        dispatch({ type: SHOW_ORDER_DETAILS_POPUP })
        dispatch(clearConstructor());
      })
      .catch(e => {
        console.log("error", e);
      })
  }

  const hasBun = () => {
    return constructorItems && constructorItems.find(el => el.type === IngredientTypes.bun.type)
  }

  return (
    <section className={`${s.constructor} ${styles.ml_auto}`} ref={dropTarget} >
      {(!constructorItems || constructorItems.length === 0) &&
        <div className="text text_type_main-default">
          Перетащите ингридиенты в конструктор
        </div>
      }
      {constructorItems &&
        <div className={s.constructorWrapper}>
          <div className={`${styles.mt_0} ${s.bun} pr-4 pb-4`}>
            {constructorItems
              .filter(item => item.type === IngredientTypes.bun.type)
              .map((item, index) => (
                <ConstructorElement
                  text={item.name + ' (верх)'}
                  thumbnail={item.image_mobile}
                  price={item.price}
                  type="top"
                  isLocked={true}
                  key={index}
                />
              ))}
          </div>
          <ul className={`${s.constructorContainer} ${styles.scrollable} pr-4`}>
            {constructorItems
              .filter(item => item.type !== IngredientTypes.bun.type)
              .map((item, index) => (
                <DraggableConstructorItem
                ingredient={item}
                  key={index}
                  index={hasBun() ? index + 1 : index}
                  id={hasBun() ? index + 1 : index}
                />
              ))}
          </ul>
          <div className={`${s.bun} ${styles.mb_0} pr-4 pt-4`}>
            {constructorItems
              .filter(item => item.type === IngredientTypes.bun.type)
              .map((item, index) => (
                <ConstructorElement
                  text={item.name + ' (низ)'}
                  thumbnail={item.image_mobile}
                  price={item.price}
                  type="bottom"
                  isLocked={true}
                  key={index}
                />
              ))}
          </div>

        </div>
      }
      <div className={`${s.total} pt-10`}>
        <span className="pr-10">
          <Price price={useMemo(() => countBasket(constructorItems), [constructorItems])} size={"medium"} />
        </span>
        <Button type="primary" size="large" onClick={submitOrder}>
          <p className="text text_type_main-default">Оформить заказ</p>
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;