import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import s from './page.module.css';
import styles from '../utils/styles.module.css';
import { SideMenu } from "../components/side-menu/side-menu";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, RESET_UPDATE_USER } from "../services/actions/auth";
import { useForm } from "../services/hooks/useForm";

export function ProfilePage() {
  const { user, getUserRequest, updateUserRequest, updateUserSuccess } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const {values, handleChange, setValues, changed, resetChange} = useForm({name: user.name, email: user.email, password: ''});
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const reset = () => {
    resetChange();
    setValues({ ...values, name: user.name, email: user.email })
  }

  useEffect(
    () => {
      if (user.name && user.email) {
        setValues({ ...values, name: user.name, email: user.email, password: '' })
      }
    }, [user.name, user.email]
  )

  useEffect(() => {
    if (updateUserSuccess) {
      reset();
      dispatch({ type: RESET_UPDATE_USER })
    }
  }, [updateUserSuccess])

  const onIconClick = (ref) => {
    setTimeout(() => ref.current.focus(), 0)
  }

  const onFocus = () => {
    setNameError(false);
    setEmailError(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!values.email.length || !values.name.length) {
      if (!values.email.length) {
        setEmailError(true);
      }
      if (!values.name.length) {
        setNameError(true)
      }
      return;
    }
    await dispatch(updateUser(values));
  }

  return (
    <>
      <div className={`${s.container} ${s.profile} ${s.left_side}`}>
        <SideMenu />
        {getUserRequest && 'Загрузка...'}
        {!getUserRequest && Object.keys(values).length && 
          <form className={`${styles.d_flex} ${styles.flex_column}`} onSubmit={(e) => onSubmit(e)}>
            <div className={`${s.input} pb-6`}>
              <Input onChange={handleChange}
                value={values.name}
                name={'name'}
                placeholder={'Имя'}
                type="text"
                icon="EditIcon"
                onIconClick={() => onIconClick(inputNameRef)}
                ref={inputNameRef}
                error={nameError}
                errorText={"Поле не может быть пустым"}
                onFocus={onFocus} />
            </div>
            <div className={`${s.input} pb-6`}>
              <Input onChange={handleChange}
                value={values.email}
                name={'email'}
                placeholder={'E-mail'}
                type="email"
                icon="EditIcon"
                onIconClick={() => onIconClick(inputEmailRef)}
                ref={inputEmailRef}
                error={emailError}
                errorText={"Поле не может быть пустым"}
                onFocus={onFocus} />
            </div>
            <div className={`${s.input} pb-6`}>
              <PasswordInput onChange={handleChange}
                value={values.password}
                name={'password'} />
            </div>
            {changed && <span className={`${styles.ml_auto} ${s.fade}`}>
              <Button type="secondary"
                size="medium"
                disabled={updateUserRequest}
                onClick={reset}>
                Отмена
              </Button>
              <Button type="primary"
                size="medium"
                disabled={updateUserRequest}>
                Сохранить
              </Button>
            </span>}
          </form>}
      </div>
    </>

  )
}