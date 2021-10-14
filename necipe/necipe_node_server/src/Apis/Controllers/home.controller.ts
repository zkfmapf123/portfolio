import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { HomeDto } from "../Services/Home/home.dto";
import HomeServiceBuilder from "../Services/Home/home.service";

export class HomeController extends AppController{
  private readonly homeService : HomeServiceBuilder

  constructor(service : HomeServiceBuilder) {
    super();
    this.homeService = service;
  };

  static create(service : HomeServiceBuilder) {
    return new HomeController(service);
  }

  public getHome = async(req : Request, res : Response) : Promise<any>=> {
    try {
      this.profiler.start();

      const { private_id, orderMethod,offset, limit }: HomeDto = req.body.data;
      
      // home builder
      const homeService = this.homeService
        .setPrivateId(private_id)
        .setOrderMethod(orderMethod)
        .setLimit(limit)
        .setOffset(offset)
        .create();
      
      const recipes : [] = await homeService.getAllRecipes();

      res.status(200).json({
        result: {
          recieps: recipes
        }
      })

    } catch (e) {
      res.status(404).json({
        result: {
          message: "관리자에게 문의하세요"
        }
      });

    } finally {
      this.profiler.end("get home");
    }
  }
}