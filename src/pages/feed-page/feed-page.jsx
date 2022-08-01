import { useMemo } from "react"
import { useSelector } from "react-redux"
import { FeedElementComponent } from "../../components/feed-element-component/feed-elemet-component";
import Title from "../../components/title/title";
import styles from "../../utils/styles.module.css";
import s from "./feed-page.module.css";
import { createBurger } from "../../utils/utils";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const FeedPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const location = useLocation();
  const feed = useMemo(() => {
    let burgerArray = [];
    for (let i = 0; i < 5; i++) {
      let ingrArray = []
      const burger = createBurger(ingredients);
      burger.map(el => {
        ingrArray.push(el._id)
      })
      burgerArray.push(ingrArray);
    }
    return burgerArray;
  }, [ingredients]);



  return (
    <div className={s.container}>
      <Title text="Лента заказов" />
      <div className={s.wrapper}>
        <ul className={styles.scrollable + ' ' + s.order_list + ' pr-1 mr-14'}>
          {feed.map((element, index) => (
            <li className={`${s.order_list_item} pb-6`}>
              <Link to={{ pathname: `/feed/1`, state: { background: location } }} className={s.no_link} >
                <FeedElementComponent
                  burgerIngredients={element}
                  key={index} />
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.orders_statuses}>
          <div className={s.status_table + ' pb-10 ' + styles.d_flex}>
            <div className={s.status_ready + ' pr-8'}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <div>

              </div>
            </div>
            <div className={s.status_inprogress}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
            </div>
          </div>
          <div className="pb-10">
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <h1 className='text text_type_digits-large'>28 747</h1>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <h1 className='text text_type_digits-large'>138</h1>
          </div>
        </div>
      </div>
    </div>
  )
}