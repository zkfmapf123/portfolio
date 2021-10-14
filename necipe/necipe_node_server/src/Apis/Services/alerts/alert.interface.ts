import { getAlertType } from "../../../Utils/returnType";

export interface IAlert{
  getAlertComment(): Promise<getAlertType>;
  getAlertFriends(): Promise<getAlertType>;
};

export interface IAlertBuilder{
  setPrivateId(privateId : number) : this;
  create(): any;
};

