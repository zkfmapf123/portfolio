import {Request, Response} from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { SearchDto } from "../Services/search/search.dto";
import SearchServiceBuilder from "../Services/search/search.service";

export class SearchController extends AppController {
  private readonly searchService: SearchServiceBuilder;

  constructor(service : SearchServiceBuilder) {
    super();
    this.searchService = service;
  };

  static create(service : SearchServiceBuilder) {
    return new SearchController(service);
  };

  // 최근 검색 or 인기검색을 가져온다.
  public getPopularData = async(req: Request, res: Response) => {
    this.profiler.start();

    const { private_id, limit, offset, value, method }: SearchDto = req.body.data;
    const searchService = this.searchService
      .setPrivateId(private_id)
      .create();
    
    const [result, error] = await searchService.getPopularSearchData();
    
    this.profiler.end("get before search data");
    // fail
    if (result === undefined) {
      return res.status(202).json({
        result : error
      });
    }
    
    // success
    return res.status(200).json({
      result: result
    });
  };

  // 검색어를 가져온다 
  public getSearchData = async(req: Request, res: Response) => {
    this.profiler.start();

    const { private_id, limit, offset, value, method, isPopular }: SearchDto = req.body.data;
    const searchService = this.searchService
      .setLimit(limit)
      .setMethod(method)
      .setOffset(offset)
      .setPrivateId(private_id)
      .setValue(value)
      .create();

    // 검색 데이터 가져오기
    let [result, error1] = [undefined, undefined];
    if (method === "category") {
      [result, error1] = await searchService.getCategorySearchData();
    } else {
      [result, error1] = await searchService.getHashtagSearchData();
    };

    // fail
    if (result === undefined) {
      this.profiler.end("get search data");
      return res.status(202).json({
        result : error1
      });
    };

    this.profiler.end("get search data");
    // success
    return res.status(200).json({
      result: result
    });
    
  };
}