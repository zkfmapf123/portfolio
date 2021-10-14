import { Router, Request, Response } from "express";
import { NoContentException } from "../../common/exceptions";
import { Controller } from "../../common/interfaces/controller";
import { Decode } from "../../common/interfaces/decode";
import routerPath from "../../common/router.path";
import { JwtRepo } from "../../lib/jwt";
import { builderMapping, TodoServiceBuilder } from "./todo.builder";

export class TodoController implements Controller, Decode{
    path: string = routerPath.TODO;
    router: Router = Router();

    constructor(
        private readonly todoService: TodoServiceBuilder
    ){
        this.initialRoutes();
    }
    
    initialRoutes(): void {
        const router = Router();
        
        router.get('/',this.get);                           // 가져오기
        router.post('/',this.create);                       // 만들기
        router.put(routerPath.TODO_DETAIL,this.update);     // 변경하기
        router.delete(routerPath.TODO_DETAIL,this.delete);  // 삭제하기
        router.put(routerPath.TODO_CHECK,this.check);      // 체크
        
        this.router.use(this.path,router);
    };
    
    getDecodeTokenUserId = (token : string): number => {
        const [result, err] = JwtRepo.verify(token);
        const {id} = result;
        return id;
    }

    /**
     * @param req  
     * @param res 202, 204
     * @returns  
     */
    get = async(req:Request , res :Response) =>{
        const userId = this.getDecodeTokenUserId(req.cookies['access-token']);
        const todoService = await builderMapping(req.body.data, this.todoService);

        const [todoData, err] = await todoService.get(userId);
        if(err != undefined) {
            return res.json(new NoContentException('관리자 문의 (read)'));
        }

        return res
          .json({
            status : 200,
            todoData,
            message: '할일을 가져옵니다'})
    };

    /**
     * @param req title, date
     * @param res 202, 204
     * @returns  
     */
    create = async(req:Request , res :Response) => {
        const userId = this.getDecodeTokenUserId(req.cookies['access-token']);
        const todoService = await builderMapping(req.body.data, this.todoService);

        const [isCreate, err] = await todoService.create(userId);
        if(err != undefined) {
            return res.json(new NoContentException('관리자 문의 (create)'))
        }

        return res.json({status : 200 ,message: '할일이 추가되었습니다.'})
    };

    update = async(req:Request , res :Response) =>{
        const todoService = await builderMapping(req.body.data, this.todoService);

        const [isUpdate, err] = await todoService.update(+req.params.id);
        if(err != undefined ){
            return res.json(new NoContentException('관리자 문의 (update)'));
        };

        return res.json({status : 200 ,message: '할일이 변경되었습니다.'})
        
    };

    delete = async(req:Request , res :Response) =>{
        const todoService = await builderMapping(req.body.data, this.todoService);

        const [isDelete, err] = await todoService.delete(+req.params.id);
        if(err != undefined){
            return res.json(new NoContentException('관리자 문의 (delete)'));
        };

        return res.json({status : 200 ,message: '할일이 삭제되었습니다.'})

    };

    check = async(req:Request , res :Response) =>{
        const todoService = await builderMapping(req.body.data, this.todoService);

        const [isCheck, err] = await todoService.check(+req.params.id);
        if(err != undefined) {
            return res.json(new NoContentException('관리자 문의 (check)'));
        };

        return res.json({status : 200 ,message: '할일이 변경되었습니다.'})

    };

}