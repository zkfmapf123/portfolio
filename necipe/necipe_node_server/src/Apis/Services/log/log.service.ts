import { logReturnType } from "../../../Utils/returnType";
import { logType, commentLogType } from "./log.dto";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { COMMENT_LOG, FRIEND_LOG } from "./log.query";
import Log from "../../../Utils/Error/create.error";
import Date from "../../../Utils/date";

export abstract class LogService{
  
  // friend log
  static async friendLog ({ private_user_id, request_user_id }: logType): Promise<logReturnType> {
    try {
      await dbConn({
        dbQuery: `${FRIEND_LOG}`,
        dbParams: `${private_user_id},
                   ${request_user_id}`
      });

      return [true, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "friend log",
        errDate: `${Date.errDate}`,
        errDescription: e,
        errUserId: private_user_id
      });
      return [false, e];
    }
  };
  
  // comment log
  static async commentLog ({ private_user_id, request_user_id, recipe_id }: commentLogType): Promise<logReturnType> {
    try {
      await dbConn({
        dbQuery: `${COMMENT_LOG}`,
        dbParams: `${private_user_id},
                   ${request_user_id},
                   ${recipe_id}`
      });

      return [true, undefined];
    } catch (e) {
      Log({
        err: "error",
        errTitle: "friend log",
        errDate: `${Date.errDate}`,
        errDescription: e,
        errUserId: private_user_id
      });
      return [false, e];
    }
  };
};




