import { atom } from 'recoil';

type Recipe = {
  name: string;
  ingredients: string;
};

export const recipeState = atom<Recipe[]>({
  key: 'recipeState',
  default: [],
});
