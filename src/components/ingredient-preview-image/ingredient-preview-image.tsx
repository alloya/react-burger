import s from './ingredient-preview-image.module.css';
import PropTypes from "prop-types";

type TPreviewImage = {
  image_mobile: string,
  marginRight?: string,
  name: string,
  number?: number,
  faded?: boolean
}

export const IngredientPreviewImage = ({ image_mobile, marginRight = '0', name, number, faded = false, ...rest }: TPreviewImage) => {
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

IngredientPreviewImage.propTypes = {
  image_mobile: PropTypes.string.isRequired,
  marginRight: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  faded: PropTypes.bool
}

