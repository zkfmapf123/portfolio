import { DBRepo } from './common/utils/index';

const GET_WEEK_GRAPH =
"select\
 sum(study_time) as sum,\
 DATE(created_datetime) as date\
 from user_study\
 where user_id = ? and DATE(created_datetime) in (DATE(?), DATE(?))\
 group by date order by date asc";


(async()=>{
    try{
        const [row] = await DBRepo.getResult({
            query : `${GET_WEEK_GRAPH}`,
            params : `${28},
                      ${20211011},
                      ${20211014}`
        });

        console.log(row[0]);

        
    }catch(e){
        console.error(e);
    }
})();