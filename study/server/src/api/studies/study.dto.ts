import { OptionalType } from "../../common/utils/utilty.type";

export type categoryType =
"국어" | 
"영어" | 
"수학" | 
"사회" |
"과학" | 
"한국사" |
"기타";

export type StudyDto = {
    category : categoryType;
    title : string;
    date :string;
};

export type GetStudyType = {
    
}

export type StudyOptionalType = OptionalType<StudyDto>;

