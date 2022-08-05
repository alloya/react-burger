import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import styles from "../../utils/styles.module.css";
import { countBasket, sortIngredients } from "../../utils/utils";
import { IngredientPreviewImage } from "../ingredient-preview-image/ingredient-preview-image";
import Price from "../price/price";
import s from "./feed-element-component.module.css";

export const FeedElementComponent = ({ order }) => {
  const { ingredients: burgerIngredients, name, number, status, createdAt, _id: id } = order;
  const { ingredients } = useSelector(store => store.ingredients);
  const dispatch = useDispatch();
  const [picArray, setPicArray] = useState([]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch])

  useEffect(() => {
    if (burgerIngredients.length && ingredients.length) {
      const orderIngredients = [];
      burgerIngredients.forEach(element => {
        const item = ingredients.filter(elem => elem._id === element)
        if (item) {
          if (item[0].type === IngredientTypes.bun.type && orderIngredients.find(el => el._id === item[0]._id)) {
            return
          }
          orderIngredients.push(item[0])
        }
      })
      setPicArray(sortIngredients(orderIngredients))
    }
  }, [ingredients, burgerIngredients, sortIngredients]);

  const date = new Date();
  const offset = date.getTimezoneOffset();

  return (
    <div className={s.wrapper}>
      <div className={styles.d_flex + ' ' + styles.justify_between + ' pb-6'}>
        <span className="text text_type_main-default"># {number} </span>
        <span className="text text_type_main-default text_color_inactive">{moment.utc(createdAt).utcOffset(Math.abs(offset)).calendar()}</span>
      </div>
      <p className="text text_type_main-medium pb-6">{name}</p>
      <div className={styles.d_flex + ' ' + styles.justify_between}>
        <div className={s.ingredients_wrapper}>
          {picArray.map((el, index) => {
            if(index < 5) {
              return <IngredientPreviewImage {...el} key={index} marginRight='-16px' />
            }
            else if (index == 5) {
              return <IngredientPreviewImage {...el} key={index} marginRight='-16px' faded={true} number={picArray.length - index} />
            }
            else { return }
          }
          )}
        </div>
        <Price price={useMemo(() => countBasket(picArray), [picArray])} ></Price>
      </div>
    </div>
  )
}