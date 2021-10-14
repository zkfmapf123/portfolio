import { StudyOptionalType } from "./study.dto";
import { StudyService } from "./study.service";

export class StudyServiceBuilder {
    private title : string;
    private category:string;
    private date: string;

    setTitle(title : string) : this{
        this.title = title;
        return this;
    };

    setCategory(category: string) :this {
        this.category = category;
        return this;
    };

    setDate(date : string) :this {
        this.date = date;
        return this;
    };

    create() : StudyService {
        return new StudyService(this.title, this.category, this.date);
    }
};

export const StudybuilderMapping = (dto : StudyOptionalType, builder : StudyServiceBuilder) : StudyService =>{
    const { category, date, title }= dto;
    return builder.setCategory(category).setDate(date).setTitle(title).create();
};