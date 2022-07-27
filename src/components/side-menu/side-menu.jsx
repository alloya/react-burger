import { NavLink, useRouteMatch } from "react-router-dom";
import s from './side-menu.module.css';

export function SideMenu() {
  let match = useRouteMatch();
  let useIsMatch = (link, exact = false) => useRouteMatch({ path: link, exact: exact });

  return (
    <div className={`${s.side_menu} mr-15`}>
      <li className={s.menu_list}>
        <ul className={`${s.menu_item} text text_type_main-medium`}>
          <NavLink to="/profile"
            className={`${s.link} ` + (useIsMatch('/profile', true) && `${s.active}` || 'text_color_inactive')}>
            Профиль
          </NavLink>
        </ul>
        <ul className={`${s.menu_item} text text_type_main-medium`}>
          <NavLink to='/profile/orders'
            className={`${s.link} ` + (useIsMatch('/profile/orders') && `${s.active}` || 'text_color_inactive')} >
            История заказов
          </NavLink>
        </ul>
        <ul className={`${s.menu_item} text text_type_main-medium`}>
          <NavLink to="/logout" className={`${s.link} text_color_inactive`}>Выход</NavLink>
        </ul>
      </li>
      {useIsMatch('/profile', true) && <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>}
    </div>
  )
} 