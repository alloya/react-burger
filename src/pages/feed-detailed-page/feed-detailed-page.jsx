import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation, useParams } from "react-router";
import { IngredientPreviewImage } from "../../components/ingredient-preview-image/ingredient-preview-image";
import Price from "../../components/price/price";
import { getIngredients } from "../../services/actions/ingredients";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/websocket";
import { ORDERS_ALL_URL, ORDERS_PERSONAL_URL } from "../../utils/const";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import OrderStatus from "../../utils/models/order-status";
import styles from "../../utils/styles.module.css";
import { countBasket, getCookie, getDate, sortIngredients } from "../../utils/utils";
import { NotFoundPage } from "../not-found";
import s from "./feed-detailed-page.module.css";

export const FeedDetailedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { ingredients } = useSelector(store => store.ingredients);
  const [data, setData] = useState([]);
  const { wsConnected, messages } = useSelector(store => store.ws);
  const [order, setOrder] = useState(location.state?.data);
  const { id } = useParams();
  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionStart(location.pathname.includes('orders')
        ? `${ORDERS_PERSONAL_URL}?token=${getCookie('token')}`
        : ORDERS_ALL_URL));
    }
    return () => {
      wsConnected && dispatch(wsConnectionClosed);
    }
  }, [wsConnected, dispatch])

  const getOrder = () => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    if (!order) {
      const ord = messages.orders?.find(order => order._id === id);
      setOrder(ord)
    }
  }

  useEffect(() => {
    getOrder()
  }, [ingredients, messages.orders])

  const getIngredientInfo = (id) => {
    return ingredients.find(el => el._id === id);
  }

  const formIngredientData = () => {
    const data = [];
    order && order.ingredients && order.ingredients.forEach(id => {
      const element = data.find(el => el._id === id)
      if (element) {
        element.quantity = element.quantity + 1
      }
      else {
        const ingredient = getIngredientInfo(id);
        if (ingredient) {
          ingredient.quantity = ingredient.type === IngredientTypes.bun.type ? 2 : 1;
          ingredient && data.push(ingredient);
        }
      }
    })
    setData(sortIngredients(data));
  }

  const getOrderPrice = () => {
    return data.reduce((acc, el) => {
      return acc + el.price * el.quantity;
    }, 0)
  }

  useEffect(() => {
    formIngredientData();
  }, [ingredients, order])

  if (messages.orders && ingredients && !order) {
    return <NotFoundPage />
  }
  return (
    <>
      {order && <div className={s.container + ' text text_type_main-medium'}>
        <span className={styles.m_auto + " text text_type_digits-default mt-5"}># {order.number} </span>
        <p className="text text_type_main-medium pb-2 mt-10">{order.name}</p>
        <p className={(order.status === OrderStatus.done.type ? s.status_ready : '') + " text text_type_main-default mb-15"}>{order.status}</p>
        <p className="mb-6 mt-1">Состав:</p>
        <div className={styles.scrollable + ' ' + s.ingredients}>
          {data.map((el, index) => (
            <div className={s.wrapper + ' text text_type_main-default pb-4'} key={index} >
              <IngredientPreviewImage {...el} />
              <span className="pl-6 ">{el.name}</span>
              <span className={s.price_wrapper + ' text text_type_digits-default'}>
                {el.quantity + ` x  `}
                <Price price={el.quantity * el.price} />
              </span>
            </div>
          ))}
        </div>
        <span className={styles.d_flex + ' pt-10 ' + styles.justify_between + ' ' + styles.w_100}>
          <p className="text text_type_main-default text_color_inactive">{moment.utc(order.createdAt).calendar()}</p>
          <span><Price price={getOrderPrice()} /></span>
        </span>
      </div>}
    </>

  )
}