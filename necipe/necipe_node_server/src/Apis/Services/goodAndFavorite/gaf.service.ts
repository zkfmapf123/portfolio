import { AppServices } from "../../../Utils/Packages/AppServices";
import { GoodAndFavoriteType } from "../../../Utils/returnType";
import { gafType } from "./gaf.dto";
import { IFavorite, IGafBuilder, IGood } from "./gaf.interface";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import errLog from "../../../Utils/Error/create.error";
import currentDate from "../../../Utils/date";
import { DELETE_FAVORITE, DELETE_GOOD, UPDATE_FAVORITE, UPDATE_GOOD } from "./gaf.query";

class GoodAndFavoriteService extends AppServices implements IGood, IFavorite {
  private readonly privateId: number;
  private readonly recipeId: number;
  this: any;
  
  constructor({private_id, recipe_id }: gafType){
    super();
    this.privateId = private_id;
    this.recipeId = recipe_id;
  };

  public updateRecipeGood = async(): Promise<GoodAndFavoriteType> => {
    try {
      await dbConn({
        dbQuery: `${UPDATE_GOOD}`,
        dbParams: `${this.privateId},${this.recipeId}`
      });

      return [true, undefined];
    } catch (e) {
      errLog({
        err: "error",
        errTitle: "update good",
        errDate: `${currentDate}`,
        errDescription: e,
        errUserId : this.privateId
      });

      return [false, e];
    }
  };

  public deleteRecipeGood = async (): Promise<GoodAndFavoriteType> => {
    try {
      await dbConn({
        dbQuery: `${DELETE_GOOD}`,
        dbParams: `${this.privateId},${this.recipeId}`
      });

      return [true, undefined];
    } catch (e) {
      errLog({
        err: "error",
        errTitle: "delete good",
        errDate: `${currentDate}`,
        errDescription: e,
        errUserId : this.privateId
      });

      return [false, e];
    }
  };

  public updateRecipeFavorite = async (): Promise<GoodAndFavoriteType> => {
    try{
      await dbConn({
        dbQuery: `${UPDATE_FAVORITE}`,
        dbParams: `${this.privateId},${this.recipeId}`
      });

      return [true, undefined];
    } catch (e) {
      errLog({
        err: "error",
        errTitle: "update favorite",
        errDate: `${currentDate}`,
        errDescription: e,
        errUserId : this.privateId
      });

      return [false, e];
    }
  };

  public deleteRecipeFavorite = async (): Promise<GoodAndFavoriteType> => {
    try {
      await dbConn({
        dbQuery: `${DELETE_FAVORITE}`,
        dbParams: `${this.privateId},${this.recipeId}`
      });

      return [true, undefined];
    } catch (e) {
      errLog({
        err: "error",
        errTitle: "delete favorite",
        errDate: `${currentDate}`,
        errDescription: e,
        errUserId : this.privateId
      });

      return [false, e];
    }
  }
};

export class GoodAndFavoriteServiceBuilder implements IGafBuilder {
  private privateId: number;
  private recipdId: number;

  setPrivateId(privateId: number): this {
    this.privateId = privateId;
    return this;
  };

  setRecipeId(recipeId: number): this {
    this.recipdId = recipeId;
    return this;
  };

  create() {
    return new GoodAndFavoriteService({
      private_id: this.privateId,
      recipe_id: this.recipdId
    })
  };
};


