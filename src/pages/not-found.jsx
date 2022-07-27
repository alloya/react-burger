import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom";
import styles from '../utils/styles.module.css';
import s from './page.module.css';

export const NotFoundPage = () => {

  return (
    <div className={`${styles.d_flex} ${styles.flex_column} pt-20`}>
      <Link to='/' className={styles.m_auto}>
        <Button type="secondary" size="medium">
          На главную
        </Button>
      </Link>
      <p className={`${s.text_center} text text_type_main-large`}>Такой страницы не существует</p>
    </div>
  )
}