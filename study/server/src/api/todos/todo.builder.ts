import { OptionalType } from "../../common/utils/utilty.type";
import { OptionalTodoType } from "./todo.dto";
import { TodoService } from "./todo.service";

export class TodoServiceBuilder {
    private id :number;
    private title : string;
    private date:string;

    setId(id: number) :this {
        this.id = id;
        return this;
    };

    setTitle(title: string) : this {
        this.title = title;
        return this;
    };

    setDate(date: string) :this {
        this.date = date;
        return this;
    };

    create() :TodoService {
        return new TodoService(this.id, this.title, this.date)
    }
};

export const builderMapping = async(dto : OptionalTodoType, builder: TodoServiceBuilder) : Promise<TodoService> =>{   
    const {id, title, isComplete, date} = dto;

    return builder
      .setDate(date)
      .setId(+id)
      .setTitle(title)
      .create();
}

