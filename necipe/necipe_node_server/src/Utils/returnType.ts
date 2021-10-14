import { OkPacket, RowDataPacket } from "mysql2";
import { CreateRecipeDto, IdType, recipeToalType } from "../Apis/Services/recipe/recipe.dto";

// search
export type getSearchType = [{} | undefined, Error | undefined];
export type deleteRedisSearchType = [boolean, Error | undefined];

// create
export type createRecipeType = [boolean | undefined, Error | undefined];

// reicpe sub
export type getRecipeType = [recipeToalType | undefined, Error | undefined];
export type deleteRecipeType = [boolean | undefined, Error | undefined];

// comment
export type CommentReturnType = [{} | undefined, Error | undefined];
export type CommentDelType = [boolean, Error | undefined];

// good and favorite
export type GoodAndFavoriteType = [boolean, Error | undefined];

// user
export type getUserReturnType = [{} | [] | undefined | Error];
export type requestFriendReturnType = [boolean, undefined | Error];

// alert
export type getAlertType = [{} | undefined, Error | undefined];
export type friendReturnType = [boolean, Error | undefined];

// log
export type logReturnType = [boolean, Error | undefined];