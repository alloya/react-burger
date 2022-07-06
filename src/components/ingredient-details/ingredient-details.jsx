import s from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const { name, calories, proteins, fat, carbohydrates, image_large } = useSelector(store => store.ingredientModal.ingredientDetails);
  return (
    <div className={s.ingredientDetails}>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>
      <img className={s.ingredientImage} src={image_large} alt={name} />
      <div className={s.detailsWrapper}>
        <p className='text text_type_main-medium'>{name}</p>
        <ul className={`${s.details} text text_type_main-default text_color_inactive`}>
          <li>Калории, ккал <span className='text text_type_digits-default text_color_inactive'>{calories}</span></li>
          <li>Белки, г <span className='text text_type_digits-default text_color_inactive'>{proteins}</span></li>
          <li>Жиры, г <span className='text text_type_digits-default text_color_inactive'>{fat}</span></li>
          <li>Углеводы, г <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span></li>
        </ul>
      </div>
    </div>
  )
}

export default IngredientDetails;