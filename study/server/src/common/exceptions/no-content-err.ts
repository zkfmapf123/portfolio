import { HttpException} from "./HttpException";

export class NoContentException extends HttpException {
    constructor(messge = "전송할 데이터가 없습니다"){
        super({
            status : 204,
            message : messge
        })
    }
};
