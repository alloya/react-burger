import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';
import { Link, Redirect } from 'react-router-dom';
import { login } from "../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";

export function LoginPage() {
  const dispatch = useDispatch();
  const { isAuth, user, accessToken, refreshToken } = useSelector(store => store.auth);
  const [form, setValue] = useState({ email: '', password: '' });
console.log(isAuth)
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () =>   {  
    dispatch(login(form));
  }

  if (isAuth) {
    return (
      <Redirect to={ '/' } />
    )
  }

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

        <Button type="primary" size="medium" onClick={handleLogin}>
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы - новый пользователь? <Link to="/register" className={s.link}>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to="/forgot-password" className={s.link}>Восстановить пароль</Link></p>
      </div>
    </div>
  )
}