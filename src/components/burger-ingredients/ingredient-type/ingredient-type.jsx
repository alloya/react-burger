import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import s from "./ingredient-type.module.css";
import { useSelector } from "react-redux";

const IngredientType = ({ type, innerRef }) => {
  const { ingredients } = useSelector(store => store.ingredients);
 // const { constructorItems } = useSelector(store => store.constructor);
  const filter = (data, filterType) => {
    return data.filter((item) => item.type === filterType);
  }

  const arr = useMemo(() => {
    if (ingredients.length) {
      return filter(ingredients, type.type)
    }
    return null;
  }, [ingredients, type.type]
  );
  
  // const count = useEffect((el) => {
  //   debugger
  //   if (constructorItems && constructorItems.length) {
  //     return constructorItems.filter(item => item._id === el).length
  //   }
  // }, [constructorItems])

  return (
    <li className={`${s.ingredientTypeBlock} pb-10`} id={type.type} ref={innerRef}>
      <h2 className="text text_type_main-medium pb-6">{type.text}</h2>
      <ul className={s.ingredientList}>
        {arr.map((item) => (
          <IngredientItem 
            ingredient={item} 
            key={item._id}
          />
        ))}
      </ul>
    </li>
  );
}

IngredientType.propTypes = {
  type: PropTypes.object.isRequired,
  innerRef: PropTypes.func.isRequired
};

export default IngredientType;
