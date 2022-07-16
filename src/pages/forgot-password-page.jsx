import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';

export function ForgotPasswordPage() {

  const [form, setValue] = useState({ email: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div className={`${s.container} ${s.centered}`}>
      <div className={s.content}>
        <div className="text text_type_main-medium pb-6">Восстановление пароля</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.email} name={'email'} placeholder={'Укажите e-mail'} />
        </div>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль? <a href="/login" className={s.link}>Войти</a></p>
      </div>
    </div>
  )
}