import s from './page.module.css';


export function OrderInfoPage () {


  return (
    <div className={`${s.container} ${s.centered}`}>
      <div className={s.content}>
        <div className="text text_type_digits-default">#45756756</div>
        <div className="text text_type_main-medium pb-6">Order Name</div>
        
      </div>
    </div>
  )
}