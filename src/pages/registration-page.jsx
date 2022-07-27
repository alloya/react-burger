import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { createUser } from "../utils/api";
import s from './page.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registration } from "../services/actions/auth";

export function RegistrationPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { isAuth } = useSelector(store => store.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
    dispatch(registration(form))
  }

  if (isAuth) {
    return (
      <Redirect to={ '/' } />
    )
  }

  return (
    <div className={`${s.container} ${s.centered}`}>
      <form className={s.content} onSubmit={(e) => onSubmit(e, form)}>
        <div className="text text_type_main-medium pb-6">Регистрация</div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.name} name={'name'} placeholder={'Имя'} type="text"/>
        </div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} type="email" />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>
        {/* <div className={`${s.input} pb-6`}>
          <Input value={form.name} name={'name'} placeholder={'Имя'} {...register('name')}/>
        </div>
        <div className={`${s.input} pb-6`}>
          <Input value={form.email} name={'email'} placeholder={'E-mail'} type="email" {...register('email')} />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput type="password" value={form.password} name={'password'} {...register('password')} />
        </div> */}

        <Button type="primary" size="medium" >
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы? <Link to={{ pathname: `/login`, state }} className={s.link}>Войти</Link></p>
      </form>
    </div>
  )
}