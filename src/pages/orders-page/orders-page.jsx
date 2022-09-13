import s from "./orders-page.module.css";
import pageStyles from "../page.module.css";
import { SideMenu } from "../../components/side-menu/side-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/websocket";
import { useEffect, useState } from "react";
import { ORDERS_PERSONAL_URL } from "../../utils/const";
import { OrderList } from "../../components/order-list/order-list";
import { getCookie } from "../../utils/utils";

export function OrdersPage() {
  const { wsConnected, messages } = useSelector((store) => store.ws);
  const dispatch = useDispatch();
  const [feed, setFeed] = useState({});

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
