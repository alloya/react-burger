import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { IngredientPreviewImage } from "../../components/ingredient-preview-image/ingredient-preview-image";
import Price from "../../components/price/price";
import { getIngredients } from "../../services/actions/ingredients";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import styles from "../../utils/styles.module.css";
import s from "./feed-detailed-page.module.css";

export const FeedDetailedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const burgerIngredients = location.state?.data;
  const { ingredients } = useSelector(store => store.ingredients);
  const [data, setData] = useState([]);

  const getIngredientInfo = (id) => {
    return ingredients.length && ingredients.filter(el => el._id === id);
  }

  const formIngredientData = () => {
    const data = [];
    burgerIngredients && burgerIngredients.forEach(id => {
      const element = data.find(el => el._id === id)
      if (element) {
        element.quantity = element.quantity + 1
      }
      else {
        const ingredient = getIngredientInfo(id)[0];
        ingredient.quantity = ingredient.type === IngredientTypes.bun.type ? 2 : 1;
        data.push(ingredient);
      }
    })
    setData(data);
  }


  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    else {
      formIngredientData();
    }
  }, [ingredients, dispatch])


  return (
    <div className={s.container + ' text text_type_main-medium'}>
      <span className="text text_type_digits-default mt-5">{'#034535'} </span>
      <p className="text text_type_main-medium pb-2 mt-10">{data.name || 'Death Star Starship Main бургер'}</p>
      <p className="text text_type_main-default mb-15">Выполнен</p>
      <p className="mb-6 mt-1">Состав:</p>
      <div className={styles.scrollable + ' ' + s.ingredients}>
        {data.map((el, index) => (
          <div className={s.wrapper  + ' text text_type_main-default pb-4'} key={index} >
            <IngredientPreviewImage {...el}/>
            <span className="pl-6 ">{el.name}</span>
            <span className={s.price_wrapper + ' text text_type_digits-default'}>
              {`${el.quantity} x  `}
              <Price price={el.quantity * el.price} />
            </span>
          </div>
        ))}
      </div>
      <p>Вчера</p>
    </div>
  )
}