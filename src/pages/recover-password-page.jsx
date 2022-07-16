import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';

export function RecoverPasswordPage() {

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div className={`${s.container} ${s.centered}`}>
      <div className={s.content}>
        <div className="text text_type_main-medium pb-6">Восстановление пароля</div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} placeholder={'Введите новый пароль'} />
        </div>

        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.code} name={'code'} placeholder={'Введите код из письма'} />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль? <a href="/login" className={s.link}>Войти</a></p>
      </div>
    </div>
  )
}