import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, FormEvent } from "react";
import s from './page.module.css';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { setNewPassword } from "../services/actions/auth";
import { useForm } from "../services/hooks/useForm";
import { ILocationStateType } from "../components/app/app";
import { useAppDispatch, useAppSelector } from "../services/hooks/appHooks";

export function RecoverPasswordPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isAuth, setPasswordRequest, setPasswordSuccess } = useAppSelector(store => store.auth);
  const { values, handleChange } = useForm({ password: '', token: '' });
  const [tokenError, setTokenError] = useState(false);
  const location = useLocation<ILocationStateType>();
  const referrer = location.state?.from;

  useEffect(() => {
    redirectAfterReset()
  }, [setPasswordSuccess])

  const redirectAfterReset = () => {
    setPasswordSuccess && history.push('/login');
  }

  const onFocus = () => {
    setTokenError(false);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.token.length) {
      setTokenError(true);
      return;
    }
    dispatch(setNewPassword(values))
  }

  if (isAuth) {
    return <Redirect to='/' />
  }

  if (!referrer) {
    return <Redirect to='/forgot-password' />
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      {Object.keys(values).length && <form className={s.content} onSubmit={(e) => onSubmit(e)} >
        <div className="text text_type_main-medium pb-6">Восстановление пароля</div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={handleChange}
            value={values.password}
            name={'password'} />
        </div>

        <div className={`${s.input} pb-6`}>
          <Input onChange={handleChange}
            value={values.token}
            name={'token'}
            placeholder={'Введите код из письма'}
            error={tokenError}
            errorText={"Поле не может быть пустым"}
            type="text"
            onFocus={onFocus}
          />
        </div>
        <Button type="primary"
          size="medium"
          disabled={setPasswordRequest}>
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль? <Link to="/login" className={s.link}>Войти</Link></p>
      </form>}
    </div>
  )
}