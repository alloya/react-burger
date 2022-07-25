import s from './ingredient-details.module.css';
import styles from '../../utils/styles.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = (ingredient) => {
  const { name, calories, proteins, fat, carbohydrates, image_large } = useSelector(store => store.ingredientModal.ingredientDetails);
  return (
    <div className={s.ingredientDetails}>
      <h2 className={`${styles.m_auto} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={s.ingredientImage} src={image_large} alt={ingredient.name || name} />
      <div className={s.detailsWrapper}>
        <p className='text text_type_main-medium'>{ingredient.name || name}</p>
        <ul className={`${s.details} text text_type_main-default text_color_inactive`}>
          <li>Калории, ккал <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories || calories}</p></li>
          <li>Белки, г <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins || proteins}</p></li>
          <li>Жиры, г <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat || fat}</p></li>
          <li>Углеводы, г <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates || carbohydrates}</p></li>
        </ul>
      </div>
    </div>
  )
}

export default IngredientDetails;