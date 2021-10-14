import { getUserReturnType, requestFriendReturnType } from "../../../Utils/returnType";
import { LogService } from "../log/log.service";

export interface IUser{
  getUserInfo(): Promise<getUserReturnType>;
  getPopularRecipes(): Promise<getUserReturnType>;
  getHashtags(): Promise<getUserReturnType>;
  getCreateRecipes(): Promise<getUserReturnType>;
  requestFriend(): Promise<requestFriendReturnType>;
};

export interface IUserBuilder{
  setPrivateId(privateId: number): this;
  setOffset(offset: number): this;
  setLimit(limit: number): this;
  setUserId(userId: number): this;
  create(): any;
};