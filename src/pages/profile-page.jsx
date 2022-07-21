import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import s from './page.module.css';
import { SideMenu } from "../components/side-menu/side-menu";
import { useSelector } from "react-redux";
import { updateUser } from "../services/actions/auth";

export function ProfilePage() {
  const { user, getUserRequest } = useSelector(store => store.auth);
  console.log('user', user)
  const [form, setValue] = useState({ name: user.name || '', email: user.email || '', password: '' });
  console.log('form', form)
  const inputRef = useRef(null);

  useEffect(
    () => {
      if (user.name && user.email) {
        setValue({ ...form, name: user.name, email: user.email })
      }
    }, [user.name, user.email]
  )

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const update = (form) => {
    updateUser(form);
  }

  return (
    <>
      <div className={`${s.container} ${s.profile} ${s.left_side}`}>
        <SideMenu />
        {getUserRequest && 'Загрузка...'}
        {!getUserRequest &&
          <div>
            <div className={`${s.input} pb-6`}>
              <Input onChange={onChange} value={form.name} name={'name'} placeholder={'Имя'} type="text" onBlur={update} icon="EditIcon" onIconClick={onIconClick} ref={inputRef} />
            </div>
            <div className={`${s.input} pb-6`}>
              <EmailInput onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} />
            </div>
            <div className={`${s.input} pb-6`}>
              <PasswordInput onChange={onChange} value={form.password} name={'password'} />
            </div>
          </div>}
      </div>
    </>

  )
}