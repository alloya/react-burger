import s from './ingredient-details.module.css';
import styles from '../../utils/styles.module.css';
import { useAppSelector } from '../../services/hooks/appHooks';

const IngredientDetails = () => {
  const { ingredientDetails } = useAppSelector(store => store.ingredientModal);
  const { name, calories, proteins, fat, carbohydrates, image_large } = ingredientDetails!;

  return (
    <div className={s.ingredientDetails}>
      <h2 className={`${styles.m_auto} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={s.ingredientImage} src={image_large} alt={name} />
      <div className={s.detailsWrapper}>
        <p className='text text_type_main-medium'>{name}</p>
        <ul className={`${s.details} text text_type_main-default text_color_inactive`}>
          <li>Калории, ккал <p className='text text_type_digits-default text_color_inactive'>{calories}</p></li>
          <li>Белки, г <p className='text text_type_digits-default text_color_inactive'>{proteins}</p></li>
          <li>Жиры, г <p className='text text_type_digits-default text_color_inactive'>{fat}</p></li>
          <li>Углеводы, г <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p></li>
        </ul>
      </div>
    </div>
  )
}

export default IngredientDetails;