import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { changeItemOrder, deleteIngredientByIndex } from '../../../services/actions/constructor';
import styles from "../../../utils/styles.module.css";
import s from "./draggable-constructor-item.module.css";
import PropTypes from "prop-types";
import { IngredientPropTypes } from '../../../utils/prop-types';

export const DraggableConstructorItem = ({ id, index, ingredient }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ handlerId, targetOpacity }, drop] = useDrop({
    accept: 'consctuctorItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        targetOpacity: monitor.isOver() ? 1 : 0
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(changeItemOrder(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  })
  const [{ opacity }, drag] = useDrag({
    type: 'consctuctorItem',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  })

  const handleDelete = (index) => {
    dispatch(deleteIngredientByIndex(index));
  }

  drag(drop(ref));

  return (
    <li className={`${styles.align_center} ${styles.d_flex}`}
      ref={ref}
      index={index}
      data-handler-id={handlerId}>
      <span className="mr-2"><DragIcon type="primary" /></span>
      <div className={s.item}>
        <ConstructorElement
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          price={ingredient.price}
          handleClose={() => handleDelete(index)}
        />
      </div>
    </li>
  )
}

DraggableConstructorItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ingredient: IngredientPropTypes.isRequired
};
