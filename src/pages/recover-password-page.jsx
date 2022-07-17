import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { setNewPasswordRequest } from "../utils/api";
import s from './page.module.css';
import { Link } from 'react-router-dom';

export function RecoverPasswordPage() {

  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const save = () => {
    setNewPasswordRequest(form)
      .then(res => {

      })
      .catch(err => console.log(err))
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
        <Button type="primary" size="medium" onClick={save}>
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль? <Link to="/login" className={s.link}>Войти</Link></p>
      </div>
    </div>
  )
}