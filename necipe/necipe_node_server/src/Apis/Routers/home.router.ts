import { Router, Request, Response } from "express";
import { routers } from "../../Configs/routers";
import FactoryController from "../Controllers/factory";
import { HomeController } from "../Controllers/home.controller";
import HomeServiceBuilder from "../Services/Home/home.service";

const route = Router();

const homeController: HomeController =
  FactoryController.init(HomeController, new HomeServiceBuilder());

export default (app: Router) => {
  app.use(routers.HOME, route);
 
  route.post(routers.HOME, homeController.getHome);
}