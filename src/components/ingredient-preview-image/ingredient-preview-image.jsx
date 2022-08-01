import s from './ingredient-preview-image.module.css';

export const IngredientPreviewImage = ({ url }) => {
  debugger
  console.log(url)
  return (
    <>
      <img src={url } className={s.ingrPreview}></img>
    </>
  )
}

