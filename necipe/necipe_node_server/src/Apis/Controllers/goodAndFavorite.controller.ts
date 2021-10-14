import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { gafType } from "../Services/goodAndFavorite/gaf.dto";
import { GoodAndFavoriteServiceBuilder } from "../Services/goodAndFavorite/gaf.service";

export class GoodAndFavoriteController extends AppController {
  private readonly goodAndFavoriteService: GoodAndFavoriteServiceBuilder;

  constructor(service : GoodAndFavoriteServiceBuilder) {
    super();
    this.goodAndFavoriteService = service;
  };

  static create(service : GoodAndFavoriteServiceBuilder) {
    return new GoodAndFavoriteController(service);
  };

  // update good async-libray --> update?
  public updateGood = async(req: Request, res: Response): Promise<any> => {
    this.profiler.start();
    const {private_id, recipe_id} : gafType = req.body.data;

    const goodAndFavoriteController = this.goodAndFavoriteService
      .setPrivateId(private_id)
      .setRecipeId(recipe_id)
      .create();

    const [result, error] = await goodAndFavoriteController.updateRecipeGood();
    
    this.profiler.end("update good");
    // fail
    if(result === false){
      return res.status(202).json({})
    };

    // success
    return res.status(200).json({});
  };

  // delete?
  public deleteGood = async(req: Request, res: Response): Promise<any> => {
    this.profiler.start();
    const {private_id, recipe_id} : gafType = req.body.data;

    const goodAndFavoriteController = this.goodAndFavoriteService
      .setPrivateId(private_id)
      .setRecipeId(recipe_id)
      .create();

    const [result, error] = await goodAndFavoriteController.deleteRecipeGood();
    
    this.profiler.end("delete good");
    // fail
    if(result === false){
      return res.status(202).json({})
    };

    // success
    return res.status(200).json({});
  };

  public updateFavorite = async(req: Request, res: Response): Promise<any> => {
    this.profiler.start();
    const {private_id, recipe_id} : gafType = req.body.data;

    const goodAndFavoriteController = this.goodAndFavoriteService
      .setPrivateId(private_id)
      .setRecipeId(recipe_id)
      .create();

    const [result, error] = await goodAndFavoriteController.updateRecipeFavorite();
    
    this.profiler.end("update favoirte");
    // fail
    if(result === false){
      return res.status(202).json({})
    };

    // success
    return res.status(200).json({});
  };

  public deleteFavorite = async(req: Request, res: Response): Promise<any> => {
    this.profiler.start();
    const {private_id, recipe_id} : gafType = req.body.data;

    const goodAndFavoriteController = this.goodAndFavoriteService
      .setPrivateId(private_id)
      .setRecipeId(recipe_id)
      .create();

    const [result, error] = await goodAndFavoriteController.deleteRecipeFavorite();
    
    this.profiler.end("delete favorite");
    // fail
    if(result === false){
      return res.status(202).json({})
    };

    // success
    return res.status(200).json({});
  };
}