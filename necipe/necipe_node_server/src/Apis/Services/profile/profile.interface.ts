import { getUserReturnType } from "../../../Utils/returnType";
import { IUser, IUserBuilder } from "../user/user.interface";

export interface IProfile{
  getUserFavorite(): Promise<getUserReturnType>;
  updateImage(): Promise<[boolean, Error | undefined]>;
  getUserInfo(): Promise<getUserReturnType>;
  getCreateRecipes(): Promise<getUserReturnType>;
  getHashtags(): Promise<getUserReturnType>;
  getPopularRecipes(): Promise<getUserReturnType>;
};

export interface IProfileBuilder extends IUserBuilder {
  setImageUrl(imageUrl: string): this;
}