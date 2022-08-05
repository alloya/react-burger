import s from './ingredient-preview-image.module.css';

export const IngredientPreviewImage = ({ image_mobile, marginRight = 0, name, number, faded = false, ...rest }) => {
  return (
    <>
      {faded
        ? <div className={s.faded}>
            <img src={image_mobile} className={s.ingrPreview + ' ' + s.lowBrightness} alt={name} style={{ marginRight: marginRight }}></img>
            <span className={s.number + ' text text_type_digits-default'}>+{number}</span>
          </div>
        : <img src={image_mobile} className={s.ingrPreview} alt={name} style={{ marginRight: marginRight }}></img>
      }
    </>
  )
}

