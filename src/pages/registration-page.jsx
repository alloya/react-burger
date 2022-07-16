import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';

export function RegistrationPage() {

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <div className={`${s.container} ${s.centered}`}>
      <div className={s.content}>
        <div className="text text_type_main-medium pb-6">Регистрация</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.name} name={'name'} placeholder={'Имя'}/>
        </div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>

        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы? <a href="/login" className={s.link}>Войти</a></p>
      </div>
    </div>
  )
}