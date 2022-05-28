import React from "react";
import PropTypes from "prop-types";
import s from "./nav-item.module.css";

const NavItem = (props) => {
  return (
    <a href="#id" className={`${s.nav_item} p-5`}>
      <span className="pr-2">{props.children}</span>
      <p className="text text_type_main-default">{props.text}</p>
    </a>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
};

export default NavItem;
