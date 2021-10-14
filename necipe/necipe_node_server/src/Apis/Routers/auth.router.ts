import {Router, Request, Response} from "express";
import { routers } from "../../Configs/routers";
import { AuthController } from "../Controllers/auth.controller";
import FactoryController from "../Controllers/factory";
import { AuthServiceBuilder } from "../Services/auth/auth.service";
const route = Router();

const authController: AuthController = FactoryController.init(AuthController, new AuthServiceBuilder());

export default(app : Router) =>{
    app.use(routers.AUTH,route);
    
    route.post(routers.HOME, authController.getAuth);
    route.post(routers.AUTH_VALIDATION, authController.isExistsUser);
};
