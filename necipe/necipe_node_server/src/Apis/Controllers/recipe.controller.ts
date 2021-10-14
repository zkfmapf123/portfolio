import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { CreateRecipeDto, RecipeReadAndDeleteType } from "../Services/recipe/recipe.dto";
import { RecipeServiceBuilder } from "../Services/recipe/recipe.service";
import { RecipeSubBuilder } from "../Services/recipe/recipe.sub.service";

export class RecipeController extends AppController{
  private recipeService: RecipeServiceBuilder;
  private recipeSubService: RecipeSubBuilder;

  constructor(service: RecipeServiceBuilder) {
    super();
    this.recipeService = service;
    this.recipeSubService = new RecipeSubBuilder(); //
  }

  static create(service : RecipeServiceBuilder) {
    return new RecipeController(service);
  };

  // recipe를 만든다.
  public createRecipe = async (req: Request, res: Response): Promise<any> => {
    this.profiler.start();

    const { private_id, mainRecipe, subRecipe }: CreateRecipeDto = req.body.data;
    const recipeService = this.recipeService
      .setMaiRecipe(mainRecipe)
      .setSubRecipe(subRecipe)
      .setPrivateId(private_id)
      .create();
    
    const [isCreate, error] = await recipeService.createRecipe();
    this.profiler.end("create recipe");

    // 실패
    if (isCreate === false) {
      return res.status(202).json({})
    };

    return res.status(200).json({});
  };

  // recipe를 가져온다.
  public getRecipe = async (req: Request, res: Response): Promise<any> => {
    this.profiler.start();

    const { recipe_id}: RecipeReadAndDeleteType = req.body.data;
    
    const recipeService = this.recipeSubService
      .setPrivateId(recipe_id)
      .create();
    
    const [recipes, error] = await recipeService.getRecipe();

    this.profiler.end("get recipes");
    // 실패
    if (recipes === undefined) {
      return res.status(202).json({
        result: {
          message : "호출된 정보를 가져올 수 없습니다"
        }
      })
    };

    // 성공
    return res.status(200).json({
      result: {
        recipes
      }
    });
  }
};