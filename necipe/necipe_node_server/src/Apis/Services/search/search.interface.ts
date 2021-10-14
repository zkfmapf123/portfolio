import { deleteRecipeType, getSearchType } from "../../../Utils/returnType";

export interface ISearch{
  getHashtagSearchData(): Promise<getSearchType>;
  getCategorySearchData(): Promise<getSearchType>;
  getPopularSearchData(): Promise<getSearchType>;
};

export interface ISearchBuilder{
  setPrivateId(private_id: number): this;
  setMethod(method: "hashtag" | "category"): this;
  setValue(value: string): this;
  setOffset(offset: number): this;
  setLimit(limit: number): this;
  setSort(sort : "rand" | "created" | "cost" | "good")
  create(): any;
};