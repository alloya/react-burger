import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { login } from "../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";

export function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuth, loginRequest } = useSelector(store => store.auth);
  const [form, setValue] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const path = location.state?.from.pathname;
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.email.length || !form.password.length) {
      if (!form.email.length) {
        setEmailError(true);
      }
      if (!form.password.length) {
        setPassError(true)
      }
      return;
    }
    dispatch(login(form));
  }

  const onFocus = () => {
    setPassError(false);
    setEmailError(false);
  }

  if (isAuth) {
    return (
      <Redirect to={path ? path : '/'} />
    )
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      <form className={s.content} onSubmit={(e) => onSubmit(e)}>
        <div className="text text_type_main-medium pb-6">Вход</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange}
            value={form.email}
            name={'email'}
            placeholder={'E-mail'}
            type="email"
            error={emailError}
            errorText={"Поле не может быть пустым"}
            onFocus={onFocus} />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange}
            value={form.password}
            name={'password'}
            error={passError}
            errorText={"Поле не может быть пустым"}
          />
          {/* {passError && <span className={`${s.error} text text_type_main-default`}>Поле не может быть пустым</span>} */}
        </div>

        <Button type="primary"
          size="medium"
          disabled={loginRequest}>
          Войти
        </Button>

        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы - новый пользователь?
          <Link to="/register" className={s.link}> Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to="/forgot-password" className={s.link}>   Восстановить пароль</Link></p>
      </form>
    </div>
  )
}