import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { ILocationStateType } from "../../components/app/app";
import { IngredientPreviewImage } from "../../components/ingredient-preview-image/ingredient-preview-image";
import Price from "../../components/price/price";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/websocket";
import { IIngredientState } from "../../services/reducers/ingredient";
import { IWSState } from "../../services/reducers/websocket";
import { TRootState } from "../../services/store/store";
import { ORDERS_ALL_URL, ORDERS_PERSONAL_URL } from "../../utils/const";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import OrderStatus from "../../utils/models/order-status";
import styles from "../../utils/styles.module.css";
import { IIngredient, TOrder } from "../../utils/types";
import { getCookie, sortIngredients } from "../../utils/utils";
import { NotFoundPage } from "../not-found";
import s from "./feed-detailed-page.module.css";

interface IParams {
  id: string
}

interface IIngredientWithQuantity extends IIngredient {
  quantity?: number
}

export const FeedDetailedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<ILocationStateType>();
  const { ingredients } = useSelector<TRootState, IIngredientState>(store => store.ingredients);
  const [data, setData] = useState<IIngredientWithQuantity[]>([]);
  const { wsConnected, messages } = useSelector<TRootState, IWSState>(store => store.ws);
  const [order, setOrder] = useState<TOrder | undefined>(location.state?.order);
  const { id } = useParams<IParams>();
  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionStart(location.pathname.includes('orders')
        ? `${ORDERS_PERSONAL_URL}?token=${getCookie('token')}`
        : ORDERS_ALL_URL));
    }
    return () => {
      wsConnected && dispatch(wsConnectionClosed());
    }
  }, [wsConnected, dispatch])

  const getOrder = () => {
    if (!order) {
      const ord = messages && messages.orders?.find(order => order._id === id);
      setOrder(ord)
    }
  }

  useEffect(() => {
    getOrder()
  }, [ingredients, messages])

  const getIngredientInfo = (id: string): IIngredient => {
    return ingredients.find(el => el._id === id)!;
  }

  const formIngredientData = () => {
    const data: IIngredientWithQuantity[] = [];
    order && order.ingredients && order.ingredients.forEach(id => {
      const element = data.find(el => el._id === id)
      if (element) {
        element.quantity = element.quantity && element.quantity + 1
      }
      else {
        const ingredient: IIngredientWithQuantity = getIngredientInfo(id);
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
      return acc + el.price * el.quantity!;
    }, 0)
  }

  useEffect(() => {
    formIngredientData();
  }, [ingredients, order])

  if (messages && messages.orders && ingredients && !order) {
    return <NotFoundPage />
  }

  const date = new Date();
  const offset = date.getTimezoneOffset();

  return (
    <>
      {order && <div className={s.container + ' text text_type_main-medium'}>
        <span className={styles.m_auto + " text text_type_digits-default mt-5"}># {order.number} </span>
        <p className="text text_type_main-medium pb-2 mt-10">{order.name}</p>
        <p className={(order.status === OrderStatus.done.type ? s.status_ready : '') + " text text_type_main-default mb-15"}>{OrderStatus[order.status].text}</p>
        <p className="mb-6 mt-1">Состав:</p>
        <div className={styles.scrollable + ' ' + s.ingredients}>
          {data.map((el, index) => (
            <div className={s.wrapper + ' text text_type_main-default pb-4'} key={index} >
              <IngredientPreviewImage {...el} />
              <span className="pl-6 ">{el.name}</span>
              <span className={s.price_wrapper + ' text text_type_digits-default'}>
                {el.quantity + ` x  `}
                <Price price={el.quantity! * el.price} />
              </span>
            </div>
          ))}
        </div>
        <span className={styles.d_flex + ' pt-10 ' + styles.justify_between + ' ' + styles.w_100}>
          <p className="text text_type_main-default text_color_inactive">{moment(order.createdAt).utcOffset(-(offset)).calendar()}</p>
          <span><Price price={getOrderPrice()} /></span>
        </span>
      </div>}
    </>

  )
}