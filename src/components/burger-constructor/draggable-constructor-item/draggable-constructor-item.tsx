import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { changeItemOrder, deleteIngredientByIndex } from '../../../services/actions/constructor';
import styles from "../../../utils/styles.module.css";
import s from "./draggable-constructor-item.module.css";
import { IIngredient } from '../../../utils/types';

interface IDraggableConstructorItem {
  id: number,
  index: number,
  ingredient: IIngredient
}

interface IDragObject {
  index: number
}

interface ICollectedProps {
  handlerId: string | symbol | null
}

export const DraggableConstructorItem: React.FC<IDraggableConstructorItem> = ({ id, index, ingredient }) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const [{ handlerId }, drop] = useDrop<IDragObject, unknown, ICollectedProps>({
    accept: 'consctuctorItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: IDragObject, monitor): void {
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
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

  const handleDelete = (idx: number) => {
    dispatch(deleteIngredientByIndex(idx));
  }

  drag(drop(ref));

  return (
    <li className={`${styles.align_center} ${styles.d_flex}`}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}>
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