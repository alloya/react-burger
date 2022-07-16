import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';

export function LoginPage() {

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div className={`${s.container} ${s.centered}`}>
      <div className={s.content}>
        <div className="text text_type_main-medium pb-6">Вход</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>

        <Button type="primary" size="medium">
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы - новый пользователь? <a href="/register" className={s.link}>Зарегистрироваться</a></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <a href="/forgot-password" className={s.link}>Восстановить пароль</a></p>
      </div>
    </div>
  )
}