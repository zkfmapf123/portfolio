import { ICreate, IDelete, IGet, IUpdate, returnTodo, returnTodoBool} from "../../common/interfaces/crud";
import { DBRepo, logRepo } from "../../common/utils";

const GET_STUDY= "select * from user_study where user_id = ? and DATE(created_datetime) = DATE(?)";
const CREATE_STUDY = "insert user_study(user_id, study_category, study_title) values(?,?,?)";
const DELETE_STUDY = "delete from user_study where id = ?";

export class StudyService implements IGet, ICreate, IDelete {

    constructor(
        private readonly category : string,
        private readonly title : string,
        private readonly date : string,
    ){}
    
    async get(userId: number): Promise<returnTodo> {
        try{
            const [row] = await DBRepo.getResult({
                query : GET_STUDY,
                params : `${userId},
                          ${this.date}`
            });

            return [row, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get study')
              .create();
            return [undefined, e];
        }
    };

    async create(userId: number): Promise<returnTodoBool> {
        try{
            await DBRepo.getResult({
                query : CREATE_STUDY,
                params : `${userId},
                          ${this.category},
                          ${this.title}`
            });
        
            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get study')
              .create();
            return [false, e];
        }
    };

    async delete(id: number): Promise<returnTodoBool> {
        try{
            await DBRepo.getResult({
                query : DELETE_STUDY,
                params: `${id}`
            });

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get study')
              .create();
            return [false, e];
        }
    }
};

