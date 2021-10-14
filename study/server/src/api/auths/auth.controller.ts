import { Controller } from '../../common/interfaces/controller';
import routerPath from '../../common/router.path';
import { Router, Request, Response} from 'express';
import { AuthBuilderMappging, AuthServiceBuidler } from './auth.builder';
import { JoinDto, LoginDto } from './auth.dto';
import { NoContentException } from '../../common/exceptions/index';
import { JwtRepo } from '../../lib/jwt';

export class AuthController implements Controller{
    path: string = routerPath.AUTH
    router: Router = Router();

    constructor(
        private readonly authService : AuthServiceBuidler
    ){this.initialRoutes()};

    initialRoutes() : void {
        const router = Router();
        
        router.post(routerPath.LOGIN,this.login);
        router.post(routerPath.JOIN,this.join);
        router.delete(routerPath.LOGOUT,this.logout);
        router.put(routerPath.FORGET,this.forget);

        this.router.use(this.path,router);
    };

    /**
     * @param req email, password
     * @param res 202(pass), 204(fail)
     */
    login = async(req:Request, res :Response) => {
        const authService = await AuthBuilderMappging(req.body.data, this.authService);
        
        // get user
        const [user, userError] = await authService.getUser();
        if(user === undefined){
            return res.json(new NoContentException('존재하지 않은 이메일입니다'));
        };
        
        const {id, email, password, name} = user;
        const [isCorrect, correctError] = await authService.isCorrectPassword(password);
        if(!isCorrect){
            return res.json(new NoContentException('비밀번호가 틀립니다'));
        };

        const token = await JwtRepo.sign({id : +id, email : email, name : name});
        return res
          .cookie('access-token',token,{httpOnly : true})
          .json({status: 200, token : token, message : '로그인 성공'})
    };

    /**
     * @param req email, password, sex, age, name 
     * @param res 202(pass), 204(fail)
     */

    join = async(req:Request, res :Response) =>{
        const authService = await AuthBuilderMappging(req.body.data,this.authService);

        // email check
        const [isExists, existsError] = await authService.isValidEmailAndName();
        if(!isExists) {
            return res.json(new NoContentException('존재하는 이메일 입니다'))
        };

        // create email
        const [isCreate, createError] = await authService.createUser();
        if(createError != undefined){
            return res.json(new NoContentException('관리자에게 문의하세요 (회원가입)'))
        };

        // get users
        const [user, userError] = await authService.getUser();
        const {id, email, name} = user;
        
        // create token
        const token = await JwtRepo.sign({id: +id, email : email, name : name});

        return res
          .cookie('access-token',token,{ httpOnly : true })
          .json({ status : 200, token: token, message: '회원가입 성공'})
    };

    logout = async(req :Request, res :Response) =>{
        return res
          .clearCookie("access-token")
          .json({ status: 200, message: '로그아웃 하였습니다'})
    };

    /**
     * @param req email
     * @param res 200 
     * @returns 
     */
    forget = async(req :Request, res :Response) =>{
        const authService = await AuthBuilderMappging(req.body.data,this.authService);
        const [isSend, sendError] = await authService.sendEmail();

        if(!isSend){
            return res.json(new NoContentException('관리자에게 문의하세요 (비밀번호 찾기)'))
        };

        return res
          .json({ status: 200, message : '임시 비밀번호를 전송하였습니다'})
    };
};
