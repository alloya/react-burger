import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
import s from './page.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, RESET_PASSWORD_RESET_STATE } from "../services/actions/auth";
import { useForm } from "../services/hooks/useForm";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { isAuth, passwordResetSuccess, passwordResetFailed, passwordResetRequest } = useSelector(store => store.auth);
  const {values, handleChange} = useForm({email: ''});
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    dispatch({ type: RESET_PASSWORD_RESET_STATE });
  }, [])

  const onFocus = () => {
    setEmailError(false);
  }

  const resetPasswordHandle = useCallback(
    (e) => {
      e.preventDefault();
      if (!values.email.length) {
        setEmailError(true);
        return;
      }
      dispatch(resetPassword(values.email));
    },
    [dispatch, values.email]
  )

  if (isAuth) {
    return <Redirect to='/' />
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      {Object.keys(values).length && <form className={s.content} onSubmit={(e) => resetPasswordHandle(e)} >
        <div className="text text_type_main-medium pb-6">Восстановление пароля</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder={'Укажите e-mail'}
            type="email"
            error={emailError}
            errorText={"Поле не может быть пустым"}
            onFocus={onFocus}
          />
        </div>
        <Button type="primary"
          size="medium"
          disabled={passwordResetRequest}>
          Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
          <Link to="/login" className={s.link}>
            Войти
          </Link>
        </p>
        {passwordResetFailed && <span>Произошла ошибка, повторите запрос позже</span>}
        {passwordResetSuccess &&
          <Redirect
            to={{
              pathname: "/recover-password",
              state: { referrer: 'reset-password' }
            }}
          />
        }
      </form>}
    </div>
  )
}