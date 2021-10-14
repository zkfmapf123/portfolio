import {Router, Request, Response} from "express";
import { routers } from "../../Configs/routers";
import FactoryController from "../Controllers/factory";
import { UserController } from "../Controllers/user.controller";
import { UserServiceBuilder } from "../Services/user/user.service";
const route = Router();

const userController: UserController =
  FactoryController.init(UserController, new UserServiceBuilder());

export default(app : Router) =>{
    app.use(routers.USER,route);
    
  route.post(routers.HOME, userController.getUserInfo);
  route.put(routers.USER_REQUEST,userController.requestFriend);
  route.post(routers.USER_RECIPES, userController.getPaginationRecipes);
};
