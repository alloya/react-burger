import s from "./orders-page.module.css";
import pageStyles from "../page.module.css";
import { SideMenu } from "../../components/side-menu/side-menu";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/websocket";
import { useEffect, useState } from "react";
import { ORDERS_PERSONAL_URL } from "../../utils/const";
import { OrderList } from "../../components/order-list/order-list";
import { getCookie } from "../../utils/utils";
import { useAppSelector, useAppDispatch } from "../../services/hooks/appHooks";
import { TFeedMessage } from "../../utils/types/wsMessage";

export const OrdersPage = () => {
  const { wsConnected, messages } = useAppSelector((store) => store.ws);
  const dispatch = useAppDispatch();
  const [feed, setFeed] = useState<TFeedMessage | undefined>(undefined);

  useEffect(() => {
    dispatch(
      wsConnectionStart(`${ORDERS_PERSONAL_URL}?token=${getCookie("token")}`)
    );
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    setFeed(messages);
  }, [wsConnected, messages, setFeed]);

  return (
    <div className={pageStyles.container + " " + pageStyles.profile}>
      <SideMenu />
      <div className={s.orders}>
        {feed && feed.orders && feed.orders.length > 0 && (
          <OrderList feed={feed.orders} />
        )}
      </div>
    </div>
  );
}
