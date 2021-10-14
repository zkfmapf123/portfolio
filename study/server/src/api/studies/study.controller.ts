import { Router, Request, Response } from 'express';
import { StudyServiceBuilder } from './study.builder';
import {Controller} from '../../common/interfaces/controller';
import { Decode } from '../../common/interfaces/decode';
import routePath from '../../common/router.path';
import { JwtRepo } from '../../lib/jwt';
import { StudybuilderMapping } from '..';
import { NoContentException } from '../../common/exceptions';

export class StudyController implements Controller, Decode {
    path: string = routePath.STUDY;
    router: Router = Router();

    constructor(
        private readonly studyService : StudyServiceBuilder
    ){ this.initialRoutes()}
    
    initialRoutes(): void {
        const router = Router();
        
        router.get('/',this.get);
        router.post('/',this.create);
        router.delete(routePath.STUDY_DETAIL,this.delete);
        
        this.router.use(this.path,router);
    };
    
    getDecodeTokenUserId = (token: string): number =>{
        const [decode ,err] = JwtRepo.verify(token);
        const {id} = decode;
        return +id; 
    };

    get = async(req:Request , res :Response) =>{
        const userId = this.getDecodeTokenUserId(req.cookies['access-token']);
        const studyService = StudybuilderMapping(req.body.data, this.studyService);

        const [studyData, err] = await studyService.get(userId);
        if(err != undefined){
            return res.json(new NoContentException('관리자 문의 (공부)'));
        }

        return res.json({status : 200, message: '공부목록을 가져왔습니다'})

    };

    create = async(req:Request, res :Response) =>{
        const userId = this.getDecodeTokenUserId(req.cookies['access-token']);
        const studyService = StudybuilderMapping(req.body.data, this.studyService);

        const [isCreate, err] = await studyService.create(userId);
        if(err != undefined){
            return res.json(new NoContentException('관리자 문의 (공부 추가)'));
        }

        return res.json({status : 200, message: '공부목록을 추가했습니다'})
    };

    delete = async(req:Request , res :Response) =>{   
        const studyService = StudybuilderMapping(req.body.data, this.studyService);

        const [isDelete, err] = await studyService.delete(+req.params.id);
        if(err != undefined){
            return res.json(new NoContentException('관리자 문의 (공부 삭제)'));
        }

        return res.json({status : 200, message: '공부목록을 삭제하였습니다'})
    };
}