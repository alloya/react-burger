import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import s from './page.module.css';
import profile from './profile-page.module.css';

export function ProfilePage() {

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={`${s.container} ${s.profile}`}>
      <div className={`${profile.side_menu} mr-15`}>
        <li className={profile.menu_list}>
          <ul className={`${profile.menu_item} text text_type_main-medium text_color_inactive`}>
            <Link to="/profile" className={`${profile.link} text_color_inactive`}>Профиль</Link>
          </ul>
          <ul className={`${profile.menu_item} text text_type_main-medium text_color_inactive`}>
            <Link to="/order-history" className={`${profile.link} text_color_inactive`}>История заказов</Link>
          </ul>
          <ul className={`${profile.menu_item} text text_type_main-medium`}>
            <Link to="/logout" className={`${profile.link} text_color_inactive`}>Выход</Link>
          </ul>
        </li>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.name} name={'name'} placeholder={'Имя'} type="text" icon="EditIcon" />
        </div>
        <div className={`${s.input} pb-6`}>
          <Input onChange={onChange} value={form.email} name={'email'} placeholder={'E-mail'} type="email" icon="EditIcon" />
        </div>
        <div className={`${s.input} pb-6`}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>
      </div>
    </div>
  )
}