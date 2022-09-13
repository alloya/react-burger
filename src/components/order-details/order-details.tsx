import s from './order-details.module.css';
import checkMark from '../../img/check.svg';
import { useSelector } from 'react-redux';
import { ICheckoutState } from '../../services/reducers/checkout';
import { TRootState } from '../../services/store/store';

const OrderDetails = () => {
  const { order } = useSelector<TRootState, ICheckoutState>(store => store.checkout);
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