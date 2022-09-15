import { useEffect, useMemo, useState } from "react";
import { Title } from "../../components/title/title";
import styles from "../../utils/styles.module.css";
import s from "./feed-page.module.css";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/actions/websocket";
import { OrderList } from "../../components/order-list/order-list";
import OrderStatus from "../../utils/models/order-status";
import { ORDERS_ALL_URL } from "../../utils/const";
import { TOrder } from "../../utils/types";
import { TFeedMessage } from "../../utils/types/wsMessage";
import { useAppDispatch, useAppSelector } from "../../services/hooks/appHooks";

export const FeedPage = () => {
  const { wsConnected, messages } = useAppSelector(store => store.ws);
  const dispatch = useAppDispatch();
  const [feed, setFeed] = useState<TFeedMessage>({ orders: [], total: 0, totalToday: 0 });
  const [done, setDone] = useState<string[][]>([]);
  const [pending, setPending] = useState<string[][]>([]);

  useEffect(() => {
    dispatch(wsConnectionStart(ORDERS_ALL_URL));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    messages && setFeed(messages);
  }, [wsConnected, messages, setFeed]);

  const doneList = useMemo(() => {
    return (
      feed.orders &&
      feed.orders.filter((el) => el.status === OrderStatus.done.type)
    );
  }, [feed]);

  const pendingList = useMemo(() => {
    return (
      feed.orders &&
      feed.orders.filter((el) => el.status !== OrderStatus.done.type)
    );
  }, [feed]);

  const divide = (arr: TOrder[], callback: (arr: string[][]) => void) => {
    let bigArr: string[][] = [];
    for (let k = 0; k < Math.ceil(arr.length / 10); k++) {
      let smallArr: string[] = [];
      for (let i = 0; i < 10; i++) {
        smallArr.push(arr[i] && arr[i].number);
      }
      bigArr.push(smallArr);
    }
    callback(bigArr);
  };

  useEffect(() => {
    doneList && divide(doneList, setDone);
    pendingList && divide(pendingList, setPending);
  }, [doneList, pendingList, setDone, setPending]);

  return (
    <div className={s.container}>
      <Title text="Лента заказов" />
      <div className={s.wrapper}>
        <div className={s.order_list}>
          {feed && feed.orders && feed.orders.length > 0 && (
            <OrderList feed={feed.orders} />
          )}
        </div>
        <div className={s.orders_statuses}>
          <div className={s.status_table + " " + styles.d_flex}>
            <div className="pr-8 mb-10">
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <div className={styles.d_flex + " " + s.status_ready}>
                {!!done.length &&
                  done.map((el, index) => (
                    <div key={index} className="pr-5">
                      {el.map((number, index) => (
                        <span
                          key={index}
                          className={
                            styles.d_block + " text text_type_digits-default"
                          }
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-10">
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <div className={styles.d_flex + " " + s.status_pending}>
                {!!pending.length &&
                  pending.map((el, index) => (
                    <div key={index} className="pr-5">
                      {el.map((number, index) => (
                        <span
                          key={index}
                          className={
                            styles.d_block + " text text_type_digits-default"
                          }
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="pb-10">
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <h1 className="text text_type_digits-large">{feed.total}</h1>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <h1 className="text text_type_digits-large">{feed.totalToday}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
