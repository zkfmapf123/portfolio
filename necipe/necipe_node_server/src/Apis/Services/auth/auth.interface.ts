import { AuthDto } from "./auth.dto";

export interface IAuth{
  getUserId(): Promise<boolean | {}>;
  createUser(): Promise<void>;
};

export interface IAuthBuilder{
  setNickname(nickname : string): this;
  setPrivateId(privateId: string): this;
  setMethod(method: string): this;
  setOs(os: string): this;
  setImageUrl(imageUrl: string): this;
  setEmail(email: string): this;
  create(): any;
};

