import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import s from './page.module.css';
import { SideMenu } from "../components/side-menu/side-menu";

export function ProfilePage() {

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={`${s.container} ${s.profile} ${s.left_side}`}>
      <SideMenu />
      <div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.name} name={'name'} placeholder={'Имя'} type="text" icon="EditIcon" />
        </div>
        <div className={`${s.input} pb-6`}>
          <EmailInput onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>
      </div>
    </div>
  )
}