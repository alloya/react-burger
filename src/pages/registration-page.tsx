import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import s from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { registration } from "../services/actions/auth";
import { useForm } from "../services/hooks/useForm";
import { useAppDispatch, useAppSelector } from "../services/hooks/appHooks";

export function RegistrationPage() {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { isAuth } = useAppSelector(store => store.auth);
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const onFocus = () => {
    setNameError(false);
    setEmailError(false);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.email.length || !values.name.length) {
      if (!values.email.length) {
        setEmailError(true);
      }
      if (!values.name.length) {
        setNameError(true)
      }
      return;
    }
    dispatch(registration(values))
  }

  if (isAuth) {
    return (
      <Redirect to={'/'} />
    )
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      {Object.keys(values).length && <form className={s.content} onSubmit={(e) => onSubmit(e)}>
        <div className="text text_type_main-medium pb-6">Регистрация</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={handleChange}
            value={values.name}
            name={'name'}
            placeholder={'Имя'}
            type="text"
            error={nameError}
            errorText={"Поле не может быть пустым"}
            onFocus={onFocus} />
        </div>
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
            name={'password'} />
        </div>

        <Button type="primary" size="medium" >
          Зарегистрироваться
        </Button>

        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы? <Link to={{ pathname: `/login`, state }} className={s.link}>Войти</Link></p>
      </form>}
    </div>
  )
}