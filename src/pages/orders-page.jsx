import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRouteMatch } from "react-router-dom";
import { useState } from "react";
import s from './page.module.css';
import { SideMenu } from "../components/side-menu/side-menu";

export function OrdersPage() {
  let match = useRouteMatch();
  

  return (
    <div className={`${s.container} ${s.profile}`}>
      <SideMenu />
      <div>
        
      </div>
    </div>
  )
}