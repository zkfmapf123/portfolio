import { OptionalType } from "../../common/utils/utilty.type";

export type TodoDto = {
    id : string;
    title : string;
    isComplete :boolean;
    date : string;
};

export type GetTodoType = {
    id : number;
    user_id : number;
    todo : string;
    isComplete: number;
    created_datetime :string;
    updated_datetime : string;
};

export type OptionalTodoType = OptionalType<TodoDto>;