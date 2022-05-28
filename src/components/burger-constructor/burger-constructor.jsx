import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import crator_pan_mobile from "../../images/name=Краторная булка N-200inormal.png";
import "./burger-constructor.css";

export default class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className="constructor">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={crator_pan_mobile}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={crator_pan_mobile}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={crator_pan_mobile}
          />
        </div>
      </section>
    );
  }
}

//export default BurgerConstructor;
