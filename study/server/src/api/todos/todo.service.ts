import { DBRepo, logRepo } from "../../common/utils";
import { returnTodoBool, returnTodo, ICreate, IUpdate, ICheck, IGet, IDelete,} from '../../common/interfaces/crud';

const CREATE_TODO = "insert user_todos(user_id, todo) values(?,?)";
const UPDATE_TODO = "update user_todos set todo = ? where id = ?";
const DELETE_TODO = "delete from user_todos where id = ?";
const CHECK_TODO = "update user_todos set isComplete = case when isComplete = 0 then 1 when isComplete = 1 then 0 end where id =?";
const GET_TODO = "select * from user_todos where user_id = ? and DATE(created_datetime) = DATE(?)";

export class TodoService implements ICreate, IUpdate, ICheck, IGet, IDelete{
    constructor(
        private readonly id : number,
        private readonly title : string,
        private readonly date : string
    ){}
    
    async create(userId : number): Promise<returnTodoBool> {
        try{
            await DBRepo.getResult({
                query : CREATE_TODO,
                params : `${userId},
                          ${this.title}`
            });

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('create todo')
              .setUserId(+userId)
              .create();
              return [false, e];
        }
    };

    async update(id : number): Promise<returnTodoBool> {
        try{
            await DBRepo.getResult({
                query : UPDATE_TODO,
                params : `${this.title},
                          ${id}`
            });

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setTitle('update todo')
              .create();
              return [false, e];
        }
    };

    async check(id : number): Promise<returnTodoBool> {
        try{    
            await DBRepo.getResult({
                query : CHECK_TODO,
                params : `${id}`
            });

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setTitle('check todo')
              .create();
              return [false, e];
        }
    };

    async get(userId : number): Promise<returnTodo> {
        try{
            const [row] = await DBRepo.getResult({
                query: GET_TODO,
                params : `${userId},
                          ${this.date}`
            });

            return [row,undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setTitle('check todo')
              .create();
            return [undefined ,e];
        }
    };
    
    async delete(id :number): Promise<returnTodoBool> {
        try{
            await DBRepo.getResult({
                query : DELETE_TODO,
                params : `${id}`
            });

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setTitle('check todo')
              .create();
            return [undefined, e];
        }
    }
}