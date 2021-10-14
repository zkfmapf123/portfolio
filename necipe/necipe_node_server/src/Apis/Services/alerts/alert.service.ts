import { AppServices } from "../../../Utils/Packages/AppServices";
import { friendReturnType, getAlertType } from "../../../Utils/returnType";
import { AlertDto } from "./alert.dto";
import { IAlert, IAlertBuilder } from "./alert.interface";
import Log from "../../../Utils/Error/create.error";
import CurrentDate from "../../../Utils/date";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { ACCEPT_FRIEND, GET_ALERT_COMMENTS, GET_ALERT_FRIENDS, REJECT_FRIEND } from "./alert.query";

class AlertService extends AppServices implements IAlert{

  private readonly privateId: number;
  private readonly userId: number;
  
  constructor({ private_id,user_id }: AlertDto){
    super();
    this.privateId = private_id;
    this.userId = user_id;
  };
  
  // get comments
  public getAlertComment = async(): Promise<getAlertType> => {
    try {
      
      const [row] = await dbConn({
        dbQuery: `${GET_ALERT_COMMENTS}`,
        dbParams: `${this.privateId}`
      });

      return [row, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get Alert Comment",
        errDescription: e,
        errDate: `${CurrentDate}`,
        errUserId: this.privateId
      });
      
      return [undefined, e];
    }
  };

  // get friends
  public getAlertFriends = async(): Promise<getAlertType> => {
    try {

      const [row] = await dbConn({
        dbQuery: `${GET_ALERT_FRIENDS}`,
        dbParams : `${this.privateId}`
      });

      return [row, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "get Alert friends",
        errDescription: e,
        errDate: `${CurrentDate}`,
        errUserId: this.privateId
      });
      
      return [undefined, e];
    }
  };

  public acceptFriend = async() : Promise<friendReturnType>=> {
    try {
      
      await dbConn({
        dbQuery: `${ACCEPT_FRIEND}`,
        dbParams: `${this.privateId},
                   ${this.userId}`
      });

      await dbConn({
        dbQuery: `${ACCEPT_FRIEND}`,
        dbParams: `${this.userId},
                   ${this.privateId}`
      });

      return [true, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "accept friends",
        errDescription: e,
        errDate: `${CurrentDate}`,
        errUserId: this.privateId
      });
      
      return [false, e];
    }
  };

  public rejectFriend = async (): Promise<friendReturnType> => {
    try {
      
      await dbConn({
        dbQuery: `${REJECT_FRIEND}`,
        dbParams: `${this.privateId},
                   ${this.userId}`
      });

      return [true, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "reject friends",
        errDescription: e,
        errDate: `${CurrentDate}`,
        errUserId: this.privateId
      });
      
      return [false, e];
    }
  };
};

export class AlertServiceBuilder implements IAlertBuilder{
  private privateId: number;
  private userId: number = 0;
  
  public setPrivateId = (privateId: number): this =>{
    this.privateId = privateId;
    return this;
  };

  public setUserId = (userId: number): this => {
    this.userId = userId;
    return this;
  }
  
  create() {
    return new AlertService({
      private_id: this.privateId,
      user_id : this.userId
    });
  };
};