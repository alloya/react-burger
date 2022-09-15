import s from "./nav-item.module.css";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

type TNavItem = {
  link: string,
  text: string,
  active?: object | null,
  children?: ReactNode
}

const NavItem: React.FC<TNavItem> = ({ link, text, active, children }) => {
  return (
    <NavLink to={link}
      className={`${s.nav_item} text text_type_main-default p-5 ` + (active ? `${s.active}` : 'text_color_inactive')}>
      <span className="pr-2">{children}</span>
      <p>
        {text}
      </p>
    </NavLink>
  );
};

export default NavItem;
