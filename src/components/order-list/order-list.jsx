import { Link, useLocation } from "react-router-dom";
import { FeedElementComponent } from "../feed-element-component/feed-elemet-component";
import s from "./order-list.module.css";
import styles from "../../utils/styles.module.css";

export const OrderList = ({ feed }) => {
  const location = useLocation();
  return (
    <ul className={styles.scrollable + ' ' + s.order_list + ' pr-1 mr-14'}>
      {feed?.length && feed.map((element) => (
        <li className={`${s.order_list_item} pb-6`} key={element._id} >
          <Link to={{ pathname: `/feed/${element._id}`, state: { background: location, data: element } }} className={s.no_link} >
            <FeedElementComponent
              order={element}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}