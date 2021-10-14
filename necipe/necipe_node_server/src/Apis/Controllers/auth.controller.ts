import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { AuthServiceBuilder } from "../Services/auth/auth.service";
import { AuthDto } from "../Services/auth/auth.dto";

export class AuthController extends AppController {
  private readonly authService: AuthServiceBuilder;

  constructor(service : AuthServiceBuilder) {
    super();
    this.authService = service;
  };

  static create(service : AuthServiceBuilder) {
    return new AuthController(service);
  };

  // auth 인증
  public getAuth = async(req: Request, res: Response) => {
    try {
      this.profiler.start();

      const {private_id, email, nickname, method, os, image_url }: AuthDto =  req.body.data;

      // auth builder
      const authService = this.authService
        .setEmail(email)
        .setImageUrl(image_url)
        .setMethod(method)
        .setNickname(nickname)
        .setOs(os)
        .setPrivateId(private_id)
        .create();
      
      // 해당 유저가 있는지 검사한다.
      if (await authService.getUserId() !== true) {
        return res.status(202).json({
          result: {
            message: "이미 중복된 닉네임이 존재합니다"
          }
        })
      };  

      // 유저를 만든다
      await authService.createUser();

      const userId: {} = await authService.getUserId();
      
      res.status(200).json({
        result: userId
      });

    } catch (e) {
      res.status(404).json({
        result: {
          message : "관리자에게 문의하세요"
        }
      });
      console.error(e);
    } finally {
      this.profiler.end("getAuth");
    }
  };

  // 이미 존재하는 닉네임인지 검사한다
  public isExistsUser = async (req: Request, res: Response) => {
    try {
      this.profiler.start();

      const { private_id }: AuthDto = req.body.data;
      const authService = this.authService
        .setPrivateId(private_id)
        .create();
      
      const id = await authService.validationUser();

      return res.status(200).json({
        result : id
      });
    
    } catch (e) {
      return res.status(202).json({});
    } finally {
      this.profiler.end("exists user");
    }
  }
};
