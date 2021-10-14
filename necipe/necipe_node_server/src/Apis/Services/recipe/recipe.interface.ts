import { RecipeDocsType, RecipeMainType } from "./recipe.dto";

export interface ICreateBuilder{
  setPrivateId(privateId: number): this;
  setMaiRecipe(recipe: RecipeMainType): this;
  setSubRecipe(recipe: RecipeDocsType[]): this;
  create(): any;
};

/**
 * recipe sub interface 
 */

export interface IRecipeSubBuilder{
  setPrivateId(recipe_id: number): this;
  create(): any;
};

