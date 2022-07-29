import PropTypes from "prop-types";
import s from "./nav-item.module.css";
import { NavLink } from "react-router-dom";

const NavItem = ({link, text, active, children}) => {
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

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.object
};

export default NavItem;
