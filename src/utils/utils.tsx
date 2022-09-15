import IngredientTypes from "./models/ingredient-type-model";
import { IIngredient } from "./types";

export const sortIngredients = (ingredients: Array<IIngredient>) => {
  return ingredients.sort((a, b) =>
    a.type === IngredientTypes.bun.type ? -1 : 1
  );
};

export const countBasket = (ingredients: ReadonlyArray<IIngredient>) => {
  if (ingredients && ingredients.length) {
    return ingredients.reduce((sum, ingredient) => {
      if (ingredient.type === IngredientTypes.bun.type) {
        return sum + ingredient.price * 2;
      }
      return sum + ingredient.price;
    }, 0);
  }
  return 0;
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: { [name: string]: any }): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = value.split("Bearer ")[1];
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, "", { expires: -1 });
}

export function setRefreshToken(name: string, value: string): void {
  localStorage.setItem(name, value);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}

export function deleteRefreshToken(): void {
  localStorage.removeItem("refreshToken");
}
