import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import s from "./ingredient-type.module.css";

class IngredientType extends React.Component {
  filter(data, filterType) {
    return data.filter((item) => item.type === filterType);
  }

  render() {
    const { type, data } = this.props;
    const arr = this.filter(data, type.type);
    return (
      <li className={`${s.ingredientTypeBlock} pb-10`} id={type.type}>
        <h2 className="text text_type_main-medium pb-6">{type.text}</h2>
        <ul className={s.ingredientList}>
          {arr.map((item) => (
            <IngredientItem {...item} key={item._id} />
          ))}
        </ul>
      </li>
    );
  }
}

IngredientType.propTypes = {
  filterType: PropTypes.object,
  data: PropTypes.array,
};

export default IngredientType;
