import { AppServices } from "../../../Utils/Packages/AppServices";
import { UserDto } from "./user.dto";
import Log from "../../../Utils/Error/create.error";
import Date from "../../../Utils/date";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { GET_CREATED_RECIPES, GET_HASHTAGS, GET_USER_INFO, REQUEST_FRIENDS } from "./user.query";
import { GET_POPULAR_DATA } from "../search/search.query";
import { getUserReturnType, requestFriendReturnType } from "../../../Utils/returnType";
import { IUser, IUserBuilder } from "./user.interface";
import { LogService } from "../log/log.service";

class UserService extends AppServices implements IUser{
  private readonly privateId: number;
  private readonly limit: number;
  private readonly offset: number;
  private readonly userId: number;
  
  constructor({private_id, limit, offset, user_id} : UserDto) {
    super();
    this.privateId = private_id;
    this.offset = offset;
    this.limit = limit;
    this.userId = user_id;
  }
  
  // 유저 정보 가져오기
  public getUserInfo = async(): Promise<getUserReturnType> => {
    try{
      const [row] = await dbConn({
        dbQuery: `${GET_USER_INFO}`,
        dbParams: `${this.privateId},
                   ${this.userId},
                   ${this.userId},`
      });

      return row[0];

    }catch(e){
      Log({
        err: "error",
        errTitle: "get user info",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: this.privateId
      });

      return [0];
    }
  };

  // 인기있는 레시피 가져오기
  public getPopularRecipes = async(): Promise<getUserReturnType> => {
    try{
      const [row] = await dbConn({
        dbQuery: `${GET_POPULAR_DATA}`,
        dbParams : `${this.userId}`
      });

      return [row];

    }catch(e){
      Log({
        err: "error",
        errTitle: "get popular recipes",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: this.privateId
      });

      return [0];
    }
  };

  // hashtag 가져오기
  public getHashtags = async(): Promise<getUserReturnType> => {
    try{
      const [row] = await dbConn({
        dbQuery: `${GET_HASHTAGS}`,
        dbParams : `${this.userId}`
      });

      return [row];

    }catch(e){
      Log({
        err: "error",
        errTitle: "get hashtags",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: this.privateId
      });

      return [0];
    }
  };

  // * paginatio 해야한다.
  public getCreateRecipes = async (): Promise<getUserReturnType> => {
    try {

      const [row] = await dbConn({
        dbQuery: `${GET_CREATED_RECIPES}`,
        dbParams: `${this.privateId},
                   ${this.userId},
                   ${this.limit},
                   ${this.offset}`
      });

      return [row[0]];

    } catch (e) {
      Log({
        err: "error",
        errTitle: "get create recipe",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: this.privateId
      });

      return [0];
    }
  };

  // request friends
  public requestFriend = async (): Promise<requestFriendReturnType> => {
    try {

      await dbConn({
        dbQuery: `${REQUEST_FRIENDS}`,
        dbParams: `${this.privateId},
                   ${this.userId}`
      });

      return [true, undefined];
        
    } catch (e) {
      Log({
        err: "error",
        errTitle: "request fail",
        errDate: Date.errDate,
        errDescription: e,
        errUserId : this.privateId
      });

      return [false, e];
    }
  }
};

export class UserServiceBuilder implements IUserBuilder{
  private privateId: number = 0;
  private limit: number = 0;
  private offset: number= 0;
  private userId: number = 0;

  public setPrivateId = (privateId: number): this => {
    this.privateId = privateId;
    return this;
  };

  public setOffset = (offset: number): this => {
    this.offset = offset;
    return this;
  };

  public setLimit = (limit: number): this => {
    this.limit = limit;
    return this;
  };

  public setUserId = (userId: number): this => {
    this.userId = userId;
    return this;
  }

  public create() {
    return new UserService({
      private_id: this.privateId,
      limit: this.limit,
      offset: this.offset,
      user_id : this.userId
    });
  };
};