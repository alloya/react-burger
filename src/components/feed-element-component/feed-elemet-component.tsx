import * as moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import styles from "../../utils/styles.module.css";
import { countBasket, sortIngredients } from "../../utils/utils";
import { IngredientPreviewImage } from "../ingredient-preview-image/ingredient-preview-image";
import Price from "../price/price";
import s from "./feed-element-component.module.css";
import { IIngredient, TOrder } from "../../utils/types";
import { TRootState } from "../..";

export const FeedElementComponent: React.FC<TOrder> = ({ ingredients: burgerIngredients,
  name,
  number,
  status,
  createdAt,
  _id: id, }) => {
  const { ingredients } = useSelector((store: TRootState) => store.ingredients);
  const [picArray, setPicArray] = useState([]);

  useEffect(() => {
    if (burgerIngredients.length && ingredients.length) {
      const orderIngredients: IIngredient[] = [];
      burgerIngredients.forEach((element: string) => {
        const item = ingredients.filter(
          (elem: IIngredient) => elem._id === element
        );
        if (item) {
          if (
            item[0].type === IngredientTypes.bun.type &&
            orderIngredients.find((el) => el._id === item[0]._id)
          ) {
            return;
          }
          orderIngredients.push(item[0]);
        }
      });
      setPicArray(sortIngredients(orderIngredients));
    }
  }, [ingredients, burgerIngredients, sortIngredients]);

  const date = new Date();
  const offset = date.getTimezoneOffset();

  return (
    <div className={s.wrapper}>
      <div className={styles.d_flex + " " + styles.justify_between + " pb-6"}>
        <span className="text text_type_main-default"># {number} </span>
        <span className="text text_type_main-default text_color_inactive">
          {moment.utc(createdAt).utcOffset(-offset).locale("ru").calendar()}{" "}
          i-GTM+3
        </span>
      </div>
      <p className="text text_type_main-medium pb-6">{name}</p>
      <div className={styles.d_flex + " " + styles.justify_between}>
        <div className={s.ingredients_wrapper}>
          {picArray.map((el: IIngredient, index) => {
            if (index < 5) {
              return (
                <IngredientPreviewImage
                  {...el}
                  key={index}
                  marginRight="-16px"
                />
              );
            } else if (index == 5) {
              return (
                <IngredientPreviewImage
                  {...el}
                  key={index}
                  marginRight="-16px"
                  faded={true}
                  number={picArray.length - index}
                />
              );
            } else {
              return;
            }
          })}
        </div>
        <Price price={useMemo(() => countBasket(picArray), [picArray])}></Price>
      </div>
    </div>
  );
};
