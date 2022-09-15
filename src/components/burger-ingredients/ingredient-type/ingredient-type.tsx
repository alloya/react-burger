import { useMemo } from "react";
import IngredientItem from "../ingredient-item/ingredient-item";
import s from "./ingredient-type.module.css";
import { IIngredient } from "../../../utils/types";
import { useAppSelector } from "../../../services/hooks/appHooks";

interface IIngredientType {
  type: { type: string, text: string },
  innerRef: any
}

const IngredientType: React.FC<IIngredientType> = ({ type, innerRef }) => {
  const { ingredients } = useAppSelector(store => store.ingredients);
  const filter = (data: IIngredient[], filterType: string) => {
    return data.filter((item) => item.type === filterType);
  }

  const arr = useMemo(() => {
    if (ingredients.length) {
      return filter(ingredients, type.type)
    }
    return null;
  }, [ingredients, type.type]
  );

  return (
    <li className={`${s.ingredientTypeBlock} pb-10`} id={type.type} ref={innerRef}>
      <h2 className="text text_type_main-medium pb-6">{type.text}</h2>
      <ul className={s.ingredientList}>
        {arr && arr.map((item) => (
          <IngredientItem
            ingredient={item}
            key={item._id}
          />
        ))}
      </ul>
    </li >
  );
}

export default IngredientType;
