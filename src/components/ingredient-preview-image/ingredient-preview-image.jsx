import s from './ingredient-preview-image.module.css';

export const IngredientPreviewImage = ({ image_mobile, marginRight = 0, name, ...rest }) => {
  return (
    <>
      <img src={image_mobile} className={s.ingrPreview} alt={name} style={{marginRight: marginRight}}></img>
    </>
  )
}

