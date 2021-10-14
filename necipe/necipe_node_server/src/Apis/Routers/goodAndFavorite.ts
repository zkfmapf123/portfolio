import { Router, Request, Response } from "express";
import { routers } from "../../Configs/routers";
import FactoryController from "../Controllers/factory";
import { GoodAndFavoriteController } from "../Controllers/goodAndFavorite.controller";
import { GoodAndFavoriteServiceBuilder } from "../Services/goodAndFavorite/gaf.service";

const route = Router();

const homeController: GoodAndFavoriteController =
  FactoryController.init(GoodAndFavoriteController, new GoodAndFavoriteServiceBuilder());

export default (app: Router) => {
  app.use(routers.HOME, route);
 
  route.put(`${routers.GOOD}`, homeController.updateGood);
  route.delete(`${routers.GOOD}`, homeController.deleteGood);
  route.put(`${routers.FAVORITE}`, homeController.updateFavorite);
  route.delete(`${routers.FAVORITE}`, homeController.deleteFavorite);
  
}