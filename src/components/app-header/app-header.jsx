import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';
import styles from '../../utils/common.module.css';
import NavItem from './header-components/nav-item/nav-item';

export default class Header extends React.Component {
  render() {
    return (
      <header className={`${s.header} mb-10`}>
        <nav className={s.nav_menu}>
          <div className={styles.d_flex}>
            <NavItem text='Конструктор'>
              <BurgerIcon type="primary" />
            </NavItem>
            <NavItem text='Лента заказов'>
              <ListIcon type="secondary" />
            </NavItem>
          </div>
          <div className={styles.m_auto}>
            <Logo />
          </div>
          <div className={styles.ml_auto}>
            <NavItem text='Личный кабинет'>
              <ProfileIcon type="secondary" />
            </NavItem>
          </div>
        </nav>
      </header>
    )
  }
}