import { Router, Request, Response } from "express";
import { routers } from "../../Configs/routers";
import { RecipeController } from "../Controllers/recipe.controller";
import FactoryController from "../Controllers/factory";
import { RecipeServiceBuilder } from "../Services/recipe/recipe.service";

const route = Router();

const recipeController: RecipeController =
  FactoryController.init(RecipeController, new RecipeServiceBuilder());

export default (app: Router) => {
  app.use(routers.RECIPE, route);
  
  // 레시피 가져오기
  route.post(routers.HOME, recipeController.getRecipe);
  
  // 레시피 만들기
  route.post(routers.CREATE_RECIPE, recipeController.createRecipe);
 
}