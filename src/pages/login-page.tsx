import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import s from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { login } from "../services/actions/auth";
import { useForm } from "../services/hooks/useForm";
import { IAuthState } from "../services/reducers/auth";
import { ILocationStateType } from "../components/app/app";
import { useAppDispatch, useAppSelector } from "../services/hooks/appHooks";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationStateType>();
  const { isAuth, loginRequest } = useAppSelector(store => store.auth);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const path = location.state?.from?.pathname;

  const { values, handleChange } = useForm({ email: '', password: '' });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.email.length || !values.password.length) {
      if (!values.email.length) {
        setEmailError(true);
      }
      if (!values.password.length) {
        setPassError(true)
      }
      return;
    }
    dispatch(login(values));
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
      {Object.keys(values).length && <form className={s.content} onSubmit={(e) => onSubmit(e)}>
        <div className="text text_type_main-medium pb-6">Вход</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder={'E-mail'}
            type="email"
            error={emailError}
            errorText={"Поле не может быть пустым"}
            onFocus={onFocus} />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={handleChange}
            value={values.password}
            name={'password'}
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
      </form>}
    </div>
  )
}