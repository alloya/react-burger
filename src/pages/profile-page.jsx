import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import s from './page.module.css';
import styles from '../utils/styles.module.css';
import { SideMenu } from "../components/side-menu/side-menu";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../services/actions/auth";

export function ProfilePage() {
  const { user, getUserRequest, updateUserRequest } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [form, setValue] = useState({ name: user.name || '', email: user.email || '', password: '' });
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
    console.log(e.target.name, e.target.value)
  };

  const update = () => {
    debugger
    dispatch(updateUser(form));
  }

  return (
    <>
      <div className={`${s.container} ${s.profile} ${s.left_side}`}>
        <SideMenu />
        {getUserRequest && 'Загрузка...'}
        {!getUserRequest &&
          <div className={`${styles.d_flex} ${styles.flex_column}`}>
            <div className={`${s.input} pb-6`}>
              <Input onChange={onChange} value={form.name} name={'name'} placeholder={'Имя'} type="text" icon="EditIcon" onIconClick={onIconClick} ref={inputRef} />
            </div>
            <div className={`${s.input} pb-6`}>
              <EmailInput onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} />
            </div>
            <div className={`${s.input} pb-6`}>
              <PasswordInput onChange={onChange} value={form.password} name={'password'} />
            </div>
            <span className={`${styles.ml_auto}`}>
              <Button type="secondary" size="medium" disabled={updateUserRequest}>
                Отмена
              </Button>
              <Button type="primary" size="medium" onClick={update} disabled={updateUserRequest}>Сохранить</Button>
            </span>
          </div>}
      </div>
    </>

  )
}