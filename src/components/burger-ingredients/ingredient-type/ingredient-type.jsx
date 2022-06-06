import React from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import s from "./ingredient-type.module.css";

const IngredientType = (props) => {
  debugger  
  const { type, data, openModal, getIngredientDetails } = props;
  const filter = (data, filterType) => {
    return data.filter((item) => item.type === filterType);
  }
  const arr = filter(data, type.type);
  return (
    <li className={`${s.ingredientTypeBlock} pb-10`} id={type.type}>
      <h2 className="text text_type_main-medium pb-6">{type.text}</h2>
      <ul className={s.ingredientList}>
        {arr.map((item) => (
          <IngredientItem ingredient={item} key={item._id}
            openModal={openModal}
            getIngredientDetails={getIngredientDetails} />
        ))}
      </ul>
    </li>
  );
}

IngredientType.propTypes = {
  filterType: PropTypes.object,
  data: PropTypes.array,
};

export default IngredientType;
