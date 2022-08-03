import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import styles from "../../utils/styles.module.css";
import { countBasket } from "../../utils/utils";
import { IngredientPreviewImage } from "../ingredient-preview-image/ingredient-preview-image";
import Price from "../price/price";
import s from "./feed-element-component.module.css";

export const FeedElementComponent = ({ burgerIngredients }) => {
  const { ingredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();
  const [picArray, setPicArray] = useState([]);


  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch])

  useEffect(() => {
    const orderIngredients = [];
    burgerIngredients.forEach(element => {
      const item = ingredients.filter(elem => elem._id === element)
      if (item) {
        orderIngredients.push(item[0])
      }

    })
    setPicArray(orderIngredients)
  }, [ingredients, burgerIngredients]);

  return (
    <div className={s.wrapper}>
      <div className={styles.d_flex + ' ' + styles.justify_between + ' pb-6'}>
        <span className="text text_type_main-default">{'#034535'} </span>
        <span className="text text_type_main-default text_color_inactive">{'Сегодня, 16:20 i-GTM+3'}</span>
      </div>
      <p className="text text_type_main-medium pb-6">{'Death Star Starship Main бургер'}</p>
      {/* {burgerIngredients.status && <span>{burgerIngredients.status}</span>} */}
      <div className={styles.d_flex + ' ' + styles.justify_between}>
        <div className={s.ingredients_wrapper}>
          {picArray.map((el, index) => (
          <IngredientPreviewImage {...el} key={index} marginRight='-16px' />
          ))}
        </div>
        <Price price={useMemo(() => countBasket(picArray), [picArray])} ></Price>
      </div>
    </div>
  )
}