import { Request, Response } from 'express';
import { AppController } from "../../Utils/Packages/AppController";
import { LogService } from '../Services/log/log.service';
import { UserDto } from '../Services/user/user.dto';
import { UserServiceBuilder } from '../Services/user/user.service';

export class UserController extends AppController{
  private readonly userService: UserServiceBuilder;

  constructor(service : UserServiceBuilder) {
    super();
    this.userService = service;    
  }
  
  static create(service : UserServiceBuilder) {
    return new UserController(service);
  };

  // 유저 정보 가져오기
  public getUserInfo = async (req: Request, res: Response): Promise<any> => {
    this.profiler.start();
    const { private_id,user_id, limit, offset }: UserDto = req.body.data;
    
    const userService = this.userService
      .setPrivateId(private_id)
      .setLimit(limit)
      .setUserId(user_id)
      .setOffset(offset)
      .create();
    
    // 유저정보 & 인기레시피 & 해쉬태그 & 최신순으로 받아오기
    const [
      userInfo,
      popularRecipes,
      hashtags,
      createdRecipes
    ] = await Promise.all(
      [userService.getUserInfo(),
      userService.getPopularRecipes(),
      userService.getHashtags(),
      userService.getCreateRecipes()]
      );
    
    this.profiler.end("get userInfo");
    return res.status(200).json({
      result: {
        userInfo,
        popularRecipes,
        hashtags,
        createdRecipes
      }
    });
  };

  // recipes pagination
  public getPaginationRecipes = async(req: Request, res: Response) : Promise<any> => {
    this.profiler.start();
    const { private_id, offset, limit }: UserDto = req.body.data;
    
    const userService = this.userService
      .setPrivateId(private_id)
      .setLimit(limit)
      .setOffset(offset)
      .create();
    
    const createdRecipes = await userService.getCreateRecipes();

    this.profiler.end("get paginationRecipes");
    return res.status(200).json({
      result: {
        createdRecipes
      }
    })
  };

  // 친구신청 걸기
  public requestFriend = async (req: Request, res: Response): Promise<any> => {
    const { private_id, user_id }: UserDto = req.body.data;
    this.profiler.start();

    const userService = this.userService
      .setPrivateId(private_id)
      .setUserId(user_id)
      .create();
    
    const [isRequest, error1] = await userService.requestFriend();

    // request fail
    if (!isRequest) {
      this.profiler.end("request friends");
      return res.status(202).json({})
    };

    const [isLog, error2] = await LogService.friendLog({
      private_user_id: private_id,
      request_user_id : user_id
    });

    // log error
    if (!isLog) {
      this.profiler.end("request friends");
      return res.status(202).json({});
    }
  
    // success request & log
    this.profiler.end("request friends");
    return res.status(200).json({});
  }
}