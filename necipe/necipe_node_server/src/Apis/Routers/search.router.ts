import { Router } from "express";
import { routers } from "../../Configs/routers";
import FactoryController from "../Controllers/factory";
import { SearchController } from "../Controllers/search.controller";
import SearchServiceBuilder from "../Services/search/search.service";

const route = Router();
const searchController: SearchController =
  FactoryController.init(SearchController, new SearchServiceBuilder());

export default (app: Router) => {
  app.use(routers.SEARCH, route);

  // 인기 검색 가져오기
  route.post(routers.POPULAR_SEARCH, searchController.getPopularData);

  // 검색어를 가져온다.
  route.post(routers.HOME, searchController.getSearchData);
}