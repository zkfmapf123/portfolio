import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { ProfileDto } from "../Services/profile/profile.dto";
import { ProfileServiceBuilder } from "../Services/profile/profile.service";

export class ProflieController extends AppController {
  private readonly profileService: ProfileServiceBuilder;

  constructor(service: ProfileServiceBuilder) {
    super();
    this.profileService = service;
  }

  static create(service: ProfileServiceBuilder) {
    return new ProflieController(service);
  }

  // 개인 정보 가져오기
  public getProfile = async (req: Request, res: Response) => {
    this.profiler.start();
    const { private_id, limit, offset, imageUrl }: ProfileDto = req.body.data;

    const profileService = this.profileService
      .setImageUrl(imageUrl)
      .setLimit(limit)
      .setOffset(offset)
      .setPrivateId(private_id)
      .create();

    const [myInfo, myHashtag, myPopularRecipes, myRecipes] = await Promise.all([
      profileService.getUserInfo(),
      profileService.getHashtags(),
      profileService.getPopularRecipes(),
      profileService.getCreateRecipes(),
    ]);

    this.profiler.end("get profile");

    return res.status(200).json({
      result: {
        myInfo,
        myHashtag,
        myPopularRecipes,
        myRecipes,
      },
    });
  };

  // 이미지 바꾸기
  public imageUpdate = async (req: Request, res: Response) => {
    this.profiler.start();

    const { private_id, imageUrl }: ProfileDto = req.body.data;

    const profileService = this.profileService
      .setImageUrl(imageUrl)
      .setPrivateId(private_id)
      .create();

    const [isUpdate, error] = await profileService.updateImage();

    this.profiler.end("update image");
    if (!isUpdate) {
      return res.status(202).json({});
    }

    return res.status(200).json({});
  };

  // 찜 목록 가져오기 
  public getFavorite = async (req: Request, res: Response) => {
    this.profiler.start();

    const { private_id }: ProfileDto = req.body.data;

    const profileService = this.profileService
      .setPrivateId(private_id)
      .create();

    const [myInfo, myFavoriteRecipe] = await Promise.all([
      profileService.getUserInfo(),
      profileService.getUserFavorite(),
    ]);

    this.profiler.end("get favorite");

    return res.status(200).json({
      result: {
        myInfo,
        myFavoriteRecipe
      }
    })
  };
};