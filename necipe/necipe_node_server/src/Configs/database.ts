import * as mysql2 from "mysql2/promise";
import config from "../Configs/index";

//mysql
const mySqlConfig = mysql2.createPool({
    host : config.db_host,
    user : config.db_user,
    password : config.db_password,
    database : "necipe",
    port : +config.db_port,
    connectionLimit : 10,
    waitForConnections : true
});

//redis
const redixConfig = {

}

export default(db : "mysql2" | "redis")=>{
    if(db === "mysql2"){
        return mySqlConfig;
    }else{
        //아직 없음
        return mysql2.createPool(redixConfig);
    }
}

