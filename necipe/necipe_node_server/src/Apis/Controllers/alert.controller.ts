import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { AlertDto } from "../Services/alerts/alert.dto";
import { AlertServiceBuilder } from "../Services/alerts/alert.service";

export class AlertController extends AppController{
  private readonly alertService: AlertServiceBuilder;

  constructor(service: AlertServiceBuilder) {
    super();
    this.alertService = service;
  };

  static create(service: AlertServiceBuilder) {
    return new AlertController(service);
  };
  
  // get alert + comments
  public getAlertAndComment = async (req : Request, res : Response): Promise<any> => {
    this.profiler.start();

    const { private_id }: AlertDto = req.body.data;

    const alertService = this.alertService
      .setPrivateId(private_id)
      .create();

    let [friends, error1] = await alertService.getAlertFriends();

    // fail (friends error)
    if (error1 !== undefined) friends = [];

    let [logs, error2] = await alertService.getAlertComment();

    // fail (comments error)
    if (error2 !== undefined) logs = [];

    this.profiler.end("get alert and comment");
    // success or avoid error
    return res.status(200).json({
      result: {
        friends,
        logs
      }
    })
  };

  // 친구 신청 수락
  public AcceptFriend = async (req: Request, res: Response): Promise<any> => {
    this.profiler.start();

    const { private_id, user_id }: AlertDto = req.body.data;
    
    const alertService = this.alertService
      .setPrivateId(private_id)
      .setUserId(user_id)
      .create();
    
    const [isAccept, error1] = await alertService.acceptFriend();
    
    // fail
    if (!isAccept) {
      this.profiler.end("accept friends");
      return res.status(202).json({})
    };
    
    const [isDelete, error2] = await alertService.rejectFriend();

    // fail 
    if (!isDelete) {
      this.profiler.end("delete friends");
      return res.status(202).json({})
    };

    this.profiler.end("accept + delete friends");
    return res.status(200).json({});
  };

  // 친구 신청 거절
  public RejectFriend = async (req: Request, res: Response) : Promise<any> => {
    this.profiler.start();

    const { private_id, user_id }: AlertDto = req.body.data;
    
    const alertService = this.alertService
      .setPrivateId(private_id)
      .setUserId(user_id)
      .create();
    
    const [isReject, error] = await alertService.rejectFriend();
    
    this.profiler.end("reject friends");
    if (!isReject) {
      return res.status(202).json({});
    };

    return res.status(200).json({});
  };
};