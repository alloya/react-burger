import { useMemo } from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import s from "./ingredient-type.module.css";
import { IngredientPropTypes } from "../../../utils/prop-types";

const IngredientType = ({ type, data, openModal, getIngredientDetails }) => {
  const filter = (data, filterType) => {
    return data.filter((item) => item.type === filterType);
  }
  const arr = useMemo(() => filter(data, type.type), [data, type.type]);
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
  type: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
  getIngredientDetails: PropTypes.func.isRequired
};

export default IngredientType;
