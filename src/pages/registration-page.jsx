import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { createUser } from "../utils/api";
import s from './page.module.css';
import { Link, useLocation } from 'react-router-dom';

export function RegistrationPage() {
  const { state } = useLocation();

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const register = () => {
    createUser(form)
      .then()
      .catch(err => console.log(err))
  }

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

        <Button type="primary" size="medium" onClick={register}>
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы? <Link to={{ pathname: `/login`, state }} className={s.link}>Войти</Link></p>
      </div>
    </div>
  )
}