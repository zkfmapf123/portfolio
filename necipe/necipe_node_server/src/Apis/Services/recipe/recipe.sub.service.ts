import { Recipe } from "../../../Utils/Packages/Recipe";
import { RecipeReadAndDeleteType, recipeToalType } from "./recipe.dto";
import { IRecipeSubBuilder } from "./recipe.interface";
import Log from "../../../Utils/Error/create.error";
import currentDate from "../../../Utils/date";
import { getRecipeType } from "../../../Utils/returnType";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { GET_RECIPE_MAIN, GET_RECIPE_SUB } from "./recipe.query";

// 읽기, 삭제, 변경
class RecipeSub extends Recipe{
  private readonly recipe_id: number;

  constructor({recipe_id}: RecipeReadAndDeleteType) {
    super();
    this.recipe_id = recipe_id;
  };

  // 레시피를 가져온다.
  public getRecipe = async () : Promise<getRecipeType>=> {
    try {
      const mainRecipe = await this.getRecipeMain();
      const subRecipe = await this.getRecipeSub();

      const recipes : recipeToalType = {
        mainRecipe: mainRecipe,
        subRecipe : subRecipe
      };

      return [recipes, undefined];
    } catch (e) {
      return [undefined, e];
    } 
  };

  // main을 가져온다.
  private getRecipeMain = async() => {
    try {
      const [row] = await dbConn({
        dbQuery: `${GET_RECIPE_MAIN}`,
        dbParams: `${this.recipe_id}`
      }).catch((e) => { throw new Error(e) });

      return row[0];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get recipe main",
        errDescription: e,
        errDate: `${currentDate}`,
        errUserId: this.recipe_id
      });
      throw e;
    }
  };

  // sub를 가져온다.
  private getRecipeSub = async () => {
    try {
      const [row] = await dbConn({
        dbQuery: `${GET_RECIPE_SUB}`,
        dbParams: `${this.recipe_id}`
      }).catch((e) => { throw new Error(e) });

      return row;
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get recipe sub",
        errDescription: e,
        errDate: `${currentDate}`,
        errUserId: this.recipe_id
      });
      throw e;
    }
  };
  
  public deleteRecipe = async () => {
    try {
      
    } catch (e) {
      
    }
  };
};

export class RecipeSubBuilder implements IRecipeSubBuilder{
  private recipe_id: number;

  setPrivateId(recipe_id: number) {
    this.recipe_id = recipe_id;
    return this;
  };

  create() {
    return new RecipeSub({
      recipe_id: this.recipe_id
    });
  }
};