import {
  Button,
  ConstructorElement
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import Price from "../price/price";
import styles from "../../utils/styles.module.css";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient } from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { DraggableConstructorItem } from "./draggable-constructor-item/draggable-constructor-item";
import { orderCheckout } from "../../services/actions/checkout";
import { useHistory } from "react-router";
import { checkAuth } from "../../services/actions/auth";
import { countBasket } from "../../utils/utils";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorItems } = useSelector(store => store.constructor);
  const { orderCheckoutRequest } = useSelector(store => store.checkout);
  const history = useHistory();

  const [, dropTarget] = useDrop({
    accept: ['ingredient'],
    drop(element) {
      dispatch(addIngredient(element))
    }
  })

  const buns = useMemo(() => {
    if (constructorItems && constructorItems.length) {
      const bun = constructorItems.find(el => el.type && el.type === IngredientTypes.bun.type);
      if (bun) {
        return [bun, bun];
      }
      return [];
    }
    return [];
  }, [constructorItems]);

  const submitOrder = async () => {
    const auth = await dispatch(checkAuth())
    !auth 
      ? history.push('/login') 
      : dispatch(orderCheckout(constructorItems.map(el => el._id)))
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
            {buns && buns[0] && <ConstructorElement
              text={buns[0].name + ' (верх)'}
              thumbnail={buns[0].image_mobile}
              price={buns[0].price}
              type="top"
              isLocked={true}
            />}
          </div>
          <ul className={`${s.constructorContainer} ${styles.scrollable} pr-4`}>
            {constructorItems
              .filter(item => item.type !== IngredientTypes.bun.type)
              .map((item, index) => (
                <DraggableConstructorItem
                  ingredient={item}
                  key={item.innerId}
                  index={hasBun() ? index + 1 : index}
                  id={hasBun() ? index + 1 : index}
                />
              ))}
          </ul>
          <div className={`${s.bun} ${styles.mb_0} pr-4 pt-4`}>
            {buns && buns[1] && <ConstructorElement
              text={buns[1].name + ' (низ)'}
              thumbnail={buns[1].image_mobile}
              price={buns[1].price}
              type="bottom"
              isLocked={true}
            />}
          </div>
        </div>
      }
      <div className={`${s.total} pt-10`}>
        <span className="pr-10">
          <Price price={useMemo(() => countBasket(constructorItems), [constructorItems])} size={"medium"} />
        </span>
        <Button type="primary" size="large" onClick={submitOrder} disabled={!hasBun() || orderCheckoutRequest}>
          <p className="text text_type_main-default">{orderCheckoutRequest ? 'Отправляем заказ' : 'Оформить заказ'}</p>
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;