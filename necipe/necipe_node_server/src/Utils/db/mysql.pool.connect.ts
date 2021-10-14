import pool from "../../Configs/database";
import Log from "../../Utils/Error/create.error";
import recentDate from "../../Utils/date";

type dbParamsTypes = {
  dbQuery: string;
  dbParams?: string;
};

export default async ({ dbQuery, dbParams}: dbParamsTypes) => {
  try {
    const connection = await pool("mysql2").getConnection();
    
    try {
      // string validation
      let dbParamsAfterValidationArray : Array<string> = [];
      dbParams.split(",").map((item) => {
        dbParamsAfterValidationArray.push(item.trim())
      });

      const result = await connection.query(
        dbQuery,
        dbParamsAfterValidationArray
      );

      connection.release();
      return result;
      
    } catch (e) {
      Log({
        err: "error",
        errTitle: "Query Error",
        errDescription: e,
        errDate: `${recentDate}`,
        errUserId: undefined
      });
      connection.release();
      throw new Error(e);
    }
  } catch (e) {
    Log({
      err: "error",
      errTitle: "DB Error",
      errDescription: e,
      errDate: `${recentDate}`,
      errUserId: undefined
    });
    throw new Error(e);
  };
};
