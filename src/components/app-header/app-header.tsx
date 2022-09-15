import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./app-header.module.css";
import styles from "../../utils/styles.module.css";
import NavItem from "./header-components/nav-item/nav-item";
import { Link, useRouteMatch } from "react-router-dom";

const Header = () => {
  let useIsMatch = (link: string, exact = false) => useRouteMatch({ path: link, exact: exact });

  return (
    <header className={`${s.header} mb-10`}>
      <nav className={s.nav_menu}>
        <div className={styles.d_flex}>
          <NavItem text="Конструктор" link="/" active={useIsMatch('/', true)}>
            <BurgerIcon type={useIsMatch('/', true) && 'primary' || 'secondary'} />
          </NavItem>
          <NavItem text="Лента заказов" link="/feed" active={useIsMatch('/feed')}>
            <ListIcon type={useIsMatch('/feed') && 'primary' || 'secondary'} />
          </NavItem>
        </div>
        <div className={styles.m_auto}>
          <Link to='/' >
            <Logo />
          </Link>
        </div>
        <div className={styles.ml_auto}>
          <NavItem text="Личный кабинет" link="/profile" active={useIsMatch('/profile')}>
            <ProfileIcon type={useIsMatch('/profile', false) && 'primary' || 'secondary'} />
          </NavItem>
        </div>
      </nav>
    </header>
  );
}


export default Header;
