import { GoodAndFavoriteType } from "../../../Utils/returnType";

export interface IGood{
  updateRecipeGood(): Promise<GoodAndFavoriteType>;
  deleteRecipeGood(): Promise<GoodAndFavoriteType>;

};
export interface IFavorite{
  updateRecipeGood(): Promise<GoodAndFavoriteType>;
  deleteRecipeGood(): Promise<GoodAndFavoriteType>;

};
export interface IGafBuilder{
  setPrivateId(privateId: number): this;
  setRecipeId(recipeId: number): this;
  create(): any;
};
