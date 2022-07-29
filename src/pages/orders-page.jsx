import s from './page.module.css';
import { SideMenu } from "../components/side-menu/side-menu";

export function OrdersPage() {
  

  return (
    <div className={`${s.container} ${s.profile}`}>
      <SideMenu />
      <div>
      <div className="text text_type_main-medium pb-6">Orders Page</div>
      </div>
    </div>
  )
}