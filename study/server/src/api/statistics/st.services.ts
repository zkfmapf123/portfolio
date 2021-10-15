import { DBRepo, logRepo } from '../../common/utils';
import { StatisticDto, StatisticStudyDto, WeekGraphType } from './st.dto';
import {IStatistic, StatisticReturnType} from './st.interface'

const GET_WEEK_GRAPH =
"select\
 sum(study_time) as sum,\
 DATE(created_datetime) as date\
 from user_study\
 where user_id = ? and DATE(created_datetime) in (DATE(?), DATE(?))\
 group by date order by date asc";

const GET_WEEK_TOTAL =
"select\
 study_category,\
 study_title,\
 study_time\
 from user_study\
 use index (idx_study_week_total)\
 where user_id = ? and DATE(created_datetime) in (DATE(?), DATE(?))\
 order by study_category, study_time desc;";

const GEY_MY_STUDY_TIME = 
"select\
 ifnull(round(avg(study_time)),0) as avg\
 from user_study where user_id = ? and DATE(created_datetime) = DATE(?)";

const GET_OTHER_STUDY_TIME = 
"select\
 ifnull(round(avg(study_time)),0) as avg\
 from user_study where user_id not in (?) and DATE(created_datetime) = DATE(?)";

export class StatisticService implements IStatistic {
    
    constructor(
        private readonly userId :number
    ){};
    
    async getStatistic({prevDate, nextDate} : StatisticDto): Promise<StatisticReturnType> {
        try{
            const weekGraph = await this.getStatisticWeekUseGraph(prevDate, nextDate);
            const weekTotal = await this.getStatisticWeekUseTotal(prevDate, nextDate);

            return [{
                weekGraph,
                weekTotal
            }, undefined];
        }catch(e){
            
            return [undefined, e];
        }
    };

    private async getStatisticWeekUseGraph(prevDate :string, nextDate :string) : Promise<WeekGraphType[]> {
        try{
            const [row] = await DBRepo.getResult({
                query : GET_WEEK_GRAPH,
                params : `${this.userId},
                          ${prevDate},
                          ${nextDate}`
            });
            
            return row[0];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get graph')
              .setUserId(this.userId)
              .create(); 
            throw e;
        }
    };

    private async getStatisticWeekUseTotal(prevDate :string , nextDate :string): Promise<{}>{
        try{
            const [row] = await DBRepo.getResult({
                query :GET_WEEK_TOTAL,
                params : `${this.userId},
                          ${prevDate},
                          ${nextDate}`,
            });

            return row;
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get total')
              .setUserId(this.userId)
              .create(); 
            throw e;
        }
    }

    async getStudyStatistic({date} : StatisticStudyDto): Promise<StatisticReturnType> {
        try{

            const myStudyTime : number= +await this.getMyStudyTime(date);
            const otherStudyTime : number = +await this.getOtherStudyTime(date);
            
            return [{
                myStudyTime,
                otherStudyTime
            }, undefined];
        }catch(e){
            return [undefined, e];
        }
    };

    private async getMyStudyTime(date) :Promise<number>{
        try{
            const [row] = await DBRepo.getResult({
                query: GEY_MY_STUDY_TIME,
                params : `${this.userId},
                          ${date}`
            });

            return row[0].avg;
        }catch(e){ 
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get my study time')
              .setUserId(this.userId)
              .create(); 
            throw e; 
        }
    };

    private async getOtherStudyTime(date) : Promise<number>{
        try{
            const [row] = await DBRepo.getResult({
                query: GET_OTHER_STUDY_TIME,
                params : `${this.userId},
                          ${date}`
            });

            return row[0].avg;
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get other study time')
              .setUserId(this.userId)
              .create();
            throw e;
        }
    };
};
