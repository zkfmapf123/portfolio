import { AppServices } from "../../../Utils/Packages/AppServices"
import { getUserReturnType, requestFriendReturnType } from "../../../Utils/returnType";
import { ProfileDto } from "./profile.dto";
import { IProfile, IProfileBuilder } from "./profile.interface";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import Log from "../../../Utils/Error/create.error";
import currentDAte from "../../../Utils/date";
import { GET_FAVORITE_RECIPE, GET_MY_CREATE_RECIPE, GET_MY_HASHTAG, GET_MY_INFO, GET_MY_POPULAR_RECIPES, UPDATE_IMAGE } from "./profile.query";

class ProfileService extends AppServices implements IProfile{
  private readonly privateId: number;
  private readonly limit: number;
  private readonly offset: number;
  private readonly imageUrl: string;

  constructor({ private_id, limit, offset, imageUrl }: ProfileDto) {
    super();
    this.privateId = private_id;
    this.limit = limit;
    this.offset = offset;
    this.imageUrl= imageUrl
  }
  
  // 찜목록을 가져온다.
  public getUserFavorite = async(): Promise<getUserReturnType> => {
    try {
      const [row] = await dbConn({
        dbQuery: `${GET_FAVORITE_RECIPE}`,
        dbParams: `${this.privateId}`
      });
      
      return [row];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get favorite recipe",
        errDescription: e,
        errDate: `${currentDAte.errDate}`,
        errUserId : this.privateId
      });
      return [0];
    }
  };

  // 이미지를 업데이트 한다.
  public updateImage = async(): Promise<[boolean, Error | undefined]> => {
    try {
      await dbConn({
        dbQuery: `${UPDATE_IMAGE}`,
        dbParams: `${this.imageUrl},
                   ${this.privateId}`
      });

      return [true, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "update image error",
        errDescription: e,
        errDate: `${currentDAte.errDate}`,
        errUserId : this.privateId
      });
      return [false, e];
    }
  };

  public getUserInfo = async(): Promise<getUserReturnType> => {
    try{
      const [row] = await dbConn({
        dbQuery: `${GET_MY_INFO}`,
        dbParams : `${this.privateId}`
      });

      return [row[0]];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get my info",
        errDescription: e,
        errDate: `${currentDAte.errDate}`,
        errUserId : this.privateId
      });

      return [0];
    }
  };

  public getCreateRecipes = async(): Promise<getUserReturnType> => {
    try {
      let addString = `${GET_MY_CREATE_RECIPE}`;
      addString += `limit ${this.limit} offset ${this.offset}`;

      const [row] = await dbConn({
        dbQuery: `${addString}`,
        dbParams : `${this.privateId}`
      });

      return [row];

    } catch (e) {
      Log({
        err: "error",
        errTitle: "get create my recipes",
        errDescription: e,
        errDate: `${currentDAte.errDate}`,
        errUserId : this.privateId
      });

      return [0];
    }
  };

  public getHashtags = async(): Promise<getUserReturnType> => {
    try {
      const [row] = await dbConn({
        dbQuery: `${GET_MY_HASHTAG}`,
        dbParams: `${this.privateId}`
      });

      return [row];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get create my hashtags",
        errDescription: e,
        errDate: `${currentDAte.errDate}`,
        errUserId : this.privateId
      });
      return [0]
    }
  };

  public getPopularRecipes = async(): Promise<getUserReturnType> => {
    try {
      const [row] = await dbConn({
        dbQuery: `${GET_MY_POPULAR_RECIPES}`,
        dbParams: `${this.privateId}`
      });

      return [row];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get create my popular recipes",
        errDescription: e,
        errDate: `${currentDAte.errDate}`,
        errUserId: this.privateId
      });
      return [0];
    }
  };
};

export class ProfileServiceBuilder implements IProfileBuilder{
  private privateId: number = 0;
  private limit: number = 0;
  private offset: number = 0;
  private imageUrl: string = "";

  public setPrivateId = (privateId: number): this =>{
    this.privateId = privateId;
    return this;
  };

  setUserId(userId: number): this {
    throw new Error("Method not implemented.");
  };

  public setOffset = (offset: number): this => {
    this.offset = offset;
    return this;
  };

  public setLimit = (limit: number) : this=>{
    this.limit = limit;
    return this;
  };

  public setImageUrl = (imageUrl: string): this => {
    this.imageUrl = imageUrl;
    return this;
  }

  public create(): any {
    return new ProfileService({
      private_id: this.privateId,
      limit: this.limit,
      offset: this.offset,
      imageUrl: this.imageUrl
    });
  };
}