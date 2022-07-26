import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import s from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { RESET_PASSWORD_RESET_STATE, setNewPassword, } from "../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";

export function RecoverPasswordPage() {
  const dispatch = useDispatch();
  const { isAuth, setPasswordRequest, setPasswordSuccess, setPasswordFailed } = useSelector(store => store.auth);
  const [form, setValue] = useState({ password: '', token: '' });
  const location = useLocation();
  const referrer = location.state?.referrer;

  useEffect(() => {
    dispatch({ type: RESET_PASSWORD_RESET_STATE })
  }, [])

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const save = () => {
    setNewPassword(form)
  }

  if (isAuth) {
    return <Redirect to='/' />
  }

  if (!referrer) {
    return <Redirect to='/forgot-password' />
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      <div className={s.content}>
        <div className="text text_type_main-medium pb-6">Восстановление пароля</div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} placeholder={'Введите новый пароль'} />
        </div>

        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.token} name={'token'} placeholder={'Введите код из письма'} />
        </div>
        <Button type="primary" size="medium" onClick={save} disabled={setPasswordRequest}>
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль? <Link to="/login" className={s.link}>Войти</Link></p>
      </div>
    </div>
  )
}