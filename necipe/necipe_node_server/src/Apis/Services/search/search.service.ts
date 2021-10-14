import { AppServices } from "../../../Utils/Packages/AppServices";
import { SearchDto } from "./search.dto";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import Log from "../../../Utils/Error/create.error";
import Date from "../../../Utils/date";
import { ISearch, ISearchBuilder } from "./search.interface";
import { deleteRecipeType, deleteRedisSearchType ,getSearchType } from "../../../Utils/returnType";
import { GET_POPULAR_DATA } from "./search.query";


class SearchService extends AppServices implements ISearch{
  private readonly privateId: number;
  private readonly offset: number;
  private readonly limit: number;
  private readonly method: "category" | "hashtag";
  private readonly value: string;
  private readonly sort: "rand" | "created" | "cost" | "good"
  private dbQuery: string;

  constructor({ sort,private_id, limit, method, value, offset}: SearchDto) {
    super();
    this.sort = sort;
    this.privateId = private_id;
    this.offset = offset;
    this.limit = limit;
    this.method = method;
    this.value = value;
  }

  // get popular data use redis
  public getPopularSearchData = async():  Promise<getSearchType> => {
    try{
      
      const [row] = await dbConn({
        dbQuery: `${GET_POPULAR_DATA}`,
        dbParams : ``
      });

      return [row, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get popular data",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: undefined
      });
      return [undefined, e];
    }
  }
 
  // get hashtag use mysql
  public getCategorySearchData = async(): Promise<getSearchType> =>{
    try {

      this.dbQuery = `select * from v_explore_recipes where cook_category = ${this.value} `;
      this.dbQuery += await this.queryAddString();

      const [row] = await dbConn({
        dbQuery : `${this.dbQuery}`,
        dbParams : ""
      });

      return [row,undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get category search data",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: undefined
      });
      return [undefined, e];
    }
  };

  // get category use mysql
  public getHashtagSearchData = async (): Promise<getSearchType> => {
    try{
      this.dbQuery = `select recipe_id, cook_title, cook_thumnail from v_explore_recipes where cook_hashtags like "%${this.value}%"`;
      this.dbQuery += await this.queryAddString();

      const [row] = await dbConn({
        dbQuery : `${this.dbQuery}`,
        dbParams : ``
      });
      
      return [row,undefined];
    }catch(e) {
      Log({
        err: "error",
        errTitle: "get hashtag search data",
        errDate: Date.errDate,
        errDescription: e,
        errUserId: undefined
      });
      return [undefined, e]; 
    }
  };

  private queryAddString = async (): Promise<string> => {
    switch (this.sort) {
        
      case "cost":
        return (`order by cook_cost desc limit ${this.limit} offset ${this.offset}`);
      
      case "created":
        return (`order by created_datetime desc desc limit ${this.limit} offset ${this.offset}`);

      case "good":
        return (`order by goodTotal limit ${this.limit} offset ${this.offset}`);
      
      default:
        return (`order by rand() desc limit ${this.limit} offset ${this.offset}`);
    };
  };
};


class SearchServiceBuilder implements ISearchBuilder{
  private value: string;
  private offset: number;
  private limit: number;
  private privateId: number;
  private method: "category" | "hashtag";
  private sort: "rand" | "created" | "cost" | "good"
  
  setMethod(method: "category" | "hashtag"): this {
    this.method = method;
    return this;
  }

  setOffset(offset: number): this {
    this.offset = offset;
    return this;
  };

  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  };

  setPrivateId(privateId: number): this{
    this.privateId = privateId;
    return this;
  };

  setValue(value: string): this{
    this.value = value;
    return this;
  };

  setSort(sort: "rand" | "created" | "cost" | "good"): this{
    this.sort = sort;
    return this;
  };

  create() {
    return new SearchService({
      private_id: this.privateId,
      method: this.method,
      value : this.value,
      offset: this.offset,
      limit: this.limit,
      sort : this.sort
    });
  }
};

export default SearchServiceBuilder;
