import eventEmitter from 'events';
import mysql2 from 'mysql2/promise';
import config from "../../config";
import {logRepo} from './log.repo';

type dbParamsType = {
    query : string;
    params ?: string;
};

const pool = mysql2.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPasswrod,
    database: "st",
    port: +config.mysqlPort,
    connectionLimit: 10,
    waitForConnections: true
});

export class DBRepo extends eventEmitter {

    private constructor(){
        super();
    };

    static async getFormatStringToArr(params : string) : Promise<Array<string>>{
        return (params.split(",").map(function(item){
            return item.trim();
        }));
    }

    static async getResult({query, params} : dbParamsType) : Promise<any>{
        const dbConn = await pool.getConnection();
        try{
            const paramsArr = await DBRepo.getFormatStringToArr(params);
            const result = await dbConn.query(query,paramsArr);
            return result;
        }catch(e){
            throw new Error(e);
        }finally{  
            dbConn.release();
        }
    }
};
