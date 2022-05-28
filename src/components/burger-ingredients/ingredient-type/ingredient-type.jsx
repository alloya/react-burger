import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import s from "./ingredient-type.module.css";

class IngredientType extends React.Component {
  filter(data, filterType) {
    return data.filter((item) => item.type === filterType);
  }

  render() {
    debugger;
    const { type, data } = this.props;
    const arr = this.filter(data, type.type);
    return (
      <>
        <h2 className="text text_type_main-medium pt-10 pb-6">{type.text}</h2>
        <div className={s.ingredientList}>
          {arr.map((item, index) => (
            <IngredientItem {...item} key={index} />
          ))}
        </div>
      </>
    );
  }
}

IngredientType.propTypes = {
  filterType: PropTypes.object,
  data: PropTypes.object,
};

export default IngredientType;
