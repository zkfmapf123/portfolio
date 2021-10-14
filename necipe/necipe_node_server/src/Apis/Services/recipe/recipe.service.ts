import { Recipe } from "../../../Utils/Packages/Recipe";
import { createRecipeType, deleteRecipeType, getRecipeType } from "../../../Utils/returnType";
import { RecipeMainType, RecipeDocsType, CreateRecipeDto } from "./recipe.dto";
import { ICreateBuilder } from "./recipe.interface";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import Log from "../../../Utils/Error/create.error";
import currentDate from "../../../Utils/date";
import { CREATE_MAIN, CREATE_SUB, GET_RECENTLY_MAKE_CREATE_RECIPE } from "./recipe.query";

class RecipeService extends Recipe{
  private readonly privateId: number;
  private readonly recipeMain: RecipeMainType;
  private readonly recipeDocs: RecipeDocsType[];

  constructor({private_id, mainRecipe, subRecipe }: CreateRecipeDto) {
    super();
    this.privateId = private_id;
    this.recipeMain = mainRecipe;
    this.recipeDocs = subRecipe;
  };

  // create
  public createRecipe = async () : Promise<createRecipeType> => {
    try {

      await this.createMainRecipe();
      await this.createSubRecipe();

      return [true, undefined];
    } catch (e) {
      return [false, e];
    }
  };

  // 메인 recipe를 만든다.
  private createMainRecipe = async(): Promise<void> => {
    try {
      const { title, time, cost, level, imageUrl, hashtag,category } = this.recipeMain;

      const timeFormatToNumber: number = +time.split(" ")[0];
      
      const formatArrayToString = await this.translateArrayToString(hashtag);
      await dbConn({
        dbQuery: `${CREATE_MAIN}`,
        dbParams: `${this.privateId},
                   ${title},
                   ${category},
                   ${timeFormatToNumber},
                   ${cost},
                   ${level},
                   ${imageUrl},
                   ${formatArrayToString}`
      });

    } catch (e) {
      Log({
        err: "error",
        errTitle: "create main recipe",
        errDescription: e,
        errDate: `${currentDate}`,
        errUserId: this.privateId
      });
      throw e;
    }
  };

  // array to string
  private translateArrayToString = async(hashtag : Array<string>) : Promise<string> => {
    try {
      
      let text = "";
      hashtag.map((item, index) => {
        text += `${item}&&`
      });
      
      return text;
    } catch (e) {
      Log({
        err: "error",
        errTitle: "translate array to string",
        errDescription: e,
        errDate: `${currentDate}`,
        errUserId: this.privateId
      });
      throw new Error(e);
    }
  }

  // 최근 만들었던 recipe id를 가져온다.
  private getRecentlyRecipeMainId = async(): Promise<string> => {
    try {

      const [row] = await dbConn({
        dbQuery: `${GET_RECENTLY_MAKE_CREATE_RECIPE}`,
        dbParams: `${this.privateId}`
      });

      return row[0].id;

    } catch (e) {
      Log({
        err: "error",
        errTitle: "get recently recipe main id",
        errDescription: e,
        errDate: `${currentDate}`,
        errUserId: this.privateId
      });
      throw e;
    }
  };

  // 서브 recipe를 만든다.
  private createSubRecipe = async() : Promise<void> => {
    try {
      // 최근 id를 가져온다.
      const recipeId = await this.getRecentlyRecipeMainId();

      this.recipeDocs.map(async (item, index) => {
        const { stage, shortDescription, description, tips, stuffs, thumnail } = item;
        const formatStringToStuffs = await this.translateArrayToString(stuffs);

        await dbConn({
          dbQuery: `${CREATE_SUB}`,
          dbParams: `${recipeId},
                     ${stage},
                     ${shortDescription},
                     ${description},
                     ${tips},
                     ${formatStringToStuffs},
                     ${thumnail}`

        });
        
      });
    } catch (e) {
      Log({
        err: "error",
        errTitle: "ccreate sub recipe",
        errDescription: e,
        errDate: `${currentDate}`,
        errUserId: this.privateId
      });
      throw e;
    }
  };
};

export class RecipeServiceBuilder implements ICreateBuilder{
  private privateId: number;
  private recipeMain: RecipeMainType;
  private recipeSub: RecipeDocsType[];

  setPrivateId(privateId: number): this {
    this.privateId = privateId;
    return this;
  };

  setMaiRecipe(recipe: RecipeMainType): this {
    this.recipeMain = recipe;
    return this;
  };

  setSubRecipe(recipe: RecipeDocsType[]): this {
    this.recipeSub = recipe;
    return this;
  };

  create() {
    return new RecipeService({
      private_id: this.privateId,
      mainRecipe: this.recipeMain,
      subRecipe: this.recipeSub
    });
  }
}