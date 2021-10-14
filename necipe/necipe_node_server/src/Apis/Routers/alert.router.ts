import {Router} from "express";
import { routers } from "../../Configs/routers";
import { AlertController } from "../Controllers/alert.controller";
import FactoryController from "../Controllers/factory";
import { AlertServiceBuilder } from "../Services/alerts/alert.service";
const route = Router();

const alertController: AlertController = FactoryController.init(AlertController, new AlertServiceBuilder());

export default(app : Router) =>{
    app.use(routers.ALERT,route);
    
    route.post(routers.HOME, alertController.getAlertAndComment);
    route.put(routers.ALERT_ACCEPT, alertController.AcceptFriend);
    route.put(routers.ALERT_REJECT, alertController.RejectFriend)
};
