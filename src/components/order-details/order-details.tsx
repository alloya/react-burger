import s from './order-details.module.css';
import checkMark from '../../img/check.svg';
import { useAppSelector } from '../../services/hooks/appHooks';

const OrderDetails = () => {
  const { order } = useAppSelector(store => store.checkout);
  return (
    <div className={s.orderDetails}>
      <h1 className='text text_type_digits-large pb-8'>{order && order.number}</h1>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img className={s.accepted} src={checkMark} alt='order accepted' />
      <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;