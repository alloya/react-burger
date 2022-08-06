import PropTypes from "prop-types";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { FeedElementComponent } from "../feed-element-component/feed-elemet-component";
import s from "./order-list.module.css";
import styles from "../../utils/styles.module.css";
import { IngredientPropTypes } from "../../utils/prop-types";

export const OrderList = ({ feed }) => {
  const location = useLocation();
  const match = useRouteMatch();
  if (location.pathname.includes('orders')) {
    feed = feed.reverse()
  }

  return (
    <ul className={styles.scrollable + ' ' + s.order_list + ' pr-1 mr-14'}>
      {feed?.length && feed.map((element) => (
        <li className={`${s.order_list_item} pb-6`} key={element._id} >
          <Link to={{ pathname: `${match.url}/${element._id}`, state: { background: location, data: element } }} className={s.no_link} >
            <FeedElementComponent
              order={element}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

OrderList.propTypes = {
  feed: PropTypes.array
}