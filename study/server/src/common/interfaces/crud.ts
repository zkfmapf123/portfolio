import { GetStudyType } from "../../api/studies/study.dto";
import { GetTodoType } from "../../api/todos/todo.dto";

export interface ICreate {
    create(userId : number) : Promise<returnTodoBool>;
};

export interface IGet {
    get(userId : number) : Promise<returnTodo>;
};

export interface IUpdate {
    update(id:number) : Promise<returnTodoBool>;
};

export interface IDelete {
    delete(Id : number) : Promise<returnTodoBool>;
};

export interface ICheck {
    check(Id : number) : Promise<returnTodoBool>;
};

export type returnTodoBool = [boolean, Error | undefined];
export type returnTodo = [GetTodoType[] | GetStudyType[] | undefined, Error | undefined];
