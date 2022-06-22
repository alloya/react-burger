import IngredientTypes from "./models/ingredient-type-model";

export function randomizeId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export const createBurger = (data) => {
  const burger = [];
  burger.push(...chooseRandom(data.filter(el => el.type === IngredientTypes.bun.type), 1));
  burger.push(...chooseRandom(data.filter(el => el.type === IngredientTypes.sauce.type), 2));
  burger.push(...chooseRandom(data.filter(el => el.type === IngredientTypes.main.type), 3));
  return shuffleArray(burger);
}

const chooseRandom = (array, requiredNumber) => {
  const randomElements = [];
  for (let index = 0; index < requiredNumber; index++) {
    randomElements.push(array[Math.floor(Math.random() * array.length)]); 
  }
  return randomElements;
}

const  shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}