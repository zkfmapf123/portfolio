import { AuthDto } from "./auth.dto";
import { IAuth, IAuthBuilder} from "./auth.interface";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { CREATE_USER, GET_USER_USE_NICKNAME } from "./auth.query";
import log from "../../../Utils/Error/create.error";
import date from "../../../Utils/date";
import { AppServices } from "../../../Utils/Packages/AppServices";

class AuthService extends AppServices implements IAuth{
  private readonly privateId: string;
  private readonly nickname: string;
  private readonly method: "kakao" | "naver" | "apple";
  private readonly os: "android" | "ios";
  private readonly imageUrl: string;
  private readonly email: string;

  constructor({private_id, nickname, method, os, image_url, email} : AuthDto) {
    super();
    this.privateId = private_id;
    this.nickname = nickname;
    this.method = method;
    this.os = os;
    this.imageUrl = image_url;
    this.email = email;
  };

  // 현재 닉네임이 이미 존재하는지 검사한다
  public getUserId = async (): Promise<boolean | {}> => {
    try {
      const [row] = await dbConn({
        dbQuery: GET_USER_USE_NICKNAME,
        dbParams: `${this.nickname}`
      });

      if (this.isDataEmpty(row)) {
        return true;
      };

      return row[0];
    } catch (e) {
      log({
        err: "error",
        errTitle: "getUserId",
        errDescription: e,
        errDate: date.errDate,
        errUserId : undefined
      });
      throw new Error(e);
    }
  };

  // 유저를 새로 만든다.
  public createUser = async (): Promise<void> => {
    try {
      await dbConn({
        dbQuery: CREATE_USER,
        dbParams: `${this.privateId},
                   ${this.imageUrl},
                   ${this.nickname},
                   ${this.method},
                   ${this.email},
                   ${this.os}`
      });
    } catch (e) {
      log({
        err: "error",
        errTitle: "create user",
        errDate: date.errDate,
        errUserId: undefined,
        errDescription: e
      });
      throw new Error(e);
    }
  };

  // 현재 유저가 있는지 검사한다.
  public validationUser = async (): Promise<number> => {
    try {
      const [row] = await dbConn({
        dbQuery: `select id from users where private_id = ?`,
        dbParams : `${this.privateId}`
      });

      if (this.isDataEmpty(row)) throw "user empty";

      return row[0].id;
      
    } catch (e) {
      log({
        err: "error",
        errTitle: "create user",
        errDate: `${date.errDate}`,
        errUserId: undefined,
        errDescription: e
      });
      throw new Error(e);
    }
  }
};

export class AuthServiceBuilder implements IAuthBuilder{
  private privateId: string;
  private nickname: string;
  private method: "kakao" | "naver" | "apple";
  private os: "android" | "ios";
  private imageUrl: string;
  private email: string;

  setNickname(nickname: string): this {
    this.nickname = nickname;
    return this;
  };

  setPrivateId(privateId: string): this {
    this.privateId = privateId;
    return this;
  };

  setMethod(method: "kakao" | "naver" | "apple"): this {
    this.method = method;
    return this;
  };

  setOs(os: "android" | "ios"): this {
    this.os = os;
    return this;
  };

  setImageUrl(imageUrl: string): this {
    this.imageUrl = imageUrl;
    return this;
  };

  setEmail(email: string): this {
    this.email = email;
    return this;
  };

  create() {
    return new AuthService({
      private_id: this.privateId,
      nickname: this.nickname,
      method: this.method,
      os: this.os,
      image_url: this.imageUrl,
      email: this.email
    });
  }
};
