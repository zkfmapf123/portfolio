import { Router, Request, Response } from "express";
import { routers } from "../../Configs/routers";
import FactoryController from "../Controllers/factory";
import { ProfileServiceBuilder } from "../Services/profile/profile.service";
import { ProflieController } from "../Controllers/profile.controller";

const route = Router();

const profileController: ProflieController =
  FactoryController.init(ProflieController, new ProfileServiceBuilder());

export default (app: Router) => {
  app.use(routers.PROFILE, route);
  
  // 내정보 가져오기
  route.post(routers.HOME, profileController.getProfile);
  
  // 이미지 업로드
  route.put(routers.HOME,profileController.imageUpdate)

  // 찜목록가져오기
  route.post(routers.PROFILE_FAVORITE,profileController.getFavorite);
}