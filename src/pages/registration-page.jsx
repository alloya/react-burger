import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../services/actions/auth";

export function RegistrationPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { isAuth } = useSelector(store => store.auth);
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onFocus = () => {
    setNameError(false);
    setEmailError(false);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.email.length || !form.name.length) {
      if (!form.email.length) {
        setEmailError(true);
      }
      if (!form.name.length) {
        setNameError(true)
      }
      return;
    }
    dispatch(registration(form))
  }

  if (isAuth) {
    return (
      <Redirect to={'/'} />
    )
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      <form className={s.content} onSubmit={(e) => onSubmit(e)}>
        <div className="text text_type_main-medium pb-6">Регистрация</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange}
            value={form.name}
            name={'name'}
            placeholder={'Имя'}
            type="text"
            error={nameError}
            errorText={"Поле не может быть пустым"}
            onFocus={onFocus} />
        </div>
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
            name={'password'} />
        </div>

        <Button type="primary" size="medium" >
          Зарегистрироваться
        </Button>

        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы? <Link to={{ pathname: `/login`, state }} className={s.link}>Войти</Link></p>
      </form>
    </div>
  )
}