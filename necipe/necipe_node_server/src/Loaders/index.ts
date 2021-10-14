import {Request, Response} from "express";
import * as express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./logger";
import api from "../Apis/api";
import config from "../Configs/index";
import os from "os";
import cluster from "cluster";

class Index{
    private app : express.Application;
    private port: number;
    private cpuNum: number;

    constructor(app : express.Application, port : number){
        this.app = app;
        this.cpuNum = os.cpus().length;
        this.port= port;
        this.endpoint();
        this.setting();
        this.app.use("/api",api());
        this.errorHandling();
        this.printApi();
    }

    //endpoint
    private endpoint(){
        console.log("endpoint");

        this.app.get("/status",(req, res)=>{
            res.status(200).end();
        });

        this.app.head("/status",(req, res)=>{
            res.status(200).end();
        })
    }

    //middleware
    private setting(){
        console.log("setting");

        this.app.enable("trust proxy");
        // helmet 공부하자
        this.app.use(cors());
        this.app.use(require("method-override")());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
    }

    //errorhandling
    private errorHandling(){
        //그외 다른 url에 들어갔을때 400 || 500 이뜨게 되는데 이때 
        console.log("error handling");
        
        this.app.use(((req : Request, res : Response, next : express.NextFunction) =>{
            const err = new Error("Not Found");
            err['status'] = 400;
            next(err);
        }));

        //error handling
        this.app.use((err , req, res, next)=>{
            if(err.name === "UnauthorizedError"){
                return res  
                    .status(err.status)
                    .send({ message : err.message})
                    .end();
            }
            return next(err);
        });

        this.app.use((err ,req , res ,next)=>{
            //이 화면이 나오게 된다.
            res.status(err.status || 500);
            res.json({
                errors:{
                    message :`안녕자기 : ${err}`
                }
            });
        });
    };

    public printApi(){
        console.log(
            `
                POST\t:${this.port}/api/auth\t==> auth 인증 - o
                POST\t:${this.port}/api/auth/validation\t==> auth 인증(존재하는지) - o

                POST\t:${this.port}/api==> home - o
                
                GET \t:${this.port}/api/search ==> search 검색  - o
                POST\t:${this.port}/api/search/popular  ==> 인기검색 5개 - o 
                
                POST\t:${this.port}/api/user ==> 유저 조회 = o
                POST\t:${this.port}/api/user/page ==> 유저 조회 (page) = o
                PUT \t:${this.port}/api/user/request ==> 친구신청 = o
                
                POST\t:${this.port}/api/alert ==> 알림 = o
                PUT \t:${this.port}/api/alert/request ==> 친구수락 = o
                PUT \t:${this.port}/api/alert/reject ==> 친구거절 = o
                
                POST\t:${this.port}/api/explore ==> 탐색
                
                POST\t:${this.port}/api/profile ==> profile - o
                PUT \t:${this.port}/api/profile ==> 이미지 업로드 - o
                PORT\t:${this.port}/api/profile/favorite ==> 찜목록 - x

                POST\t${this.port}/api/comment ==> 댓글 조회 - o
                PUT \t${this.port}/api/comment/create ==> 댓글 생성 - o
                DELETE\t${this.port}/api/comment ==> 댓글 삭제 - o

                POST\t:${this.port}/api/recipe ==> 레시피 조회\t o
                POST\t:${this.port}/api/recipe/create ==> 레피시 생성\t o
                PUT \t:${this.port}/api/recipe ==> 레시피 수정\t (보류)
                DELETE\t:${this.port}/api/recipe ==> 레시피 삭제

                //////////////////////UTILS////////////////////////
                PUT \t:${this.port}/api/good ==> 좋아요 등록 - o
                DELETE\t:${this.port}/api/good ==> 좋아요 삭제 - o
                PUT \t:${this.port}/api/favorite ==> 찜하기 등록 -o
                DELETE\t:${this.port}/api/favorite==> 찜하기 삭제 - o
            `
        )
    }

    public async start(){
        try {
            if(config.env === "production" && cluster.isMaster){
                for (let i = 0; i < this.cpuNum; i++) {
                    cluster.fork();
                }
            } else {
                this.app.listen(this.port, () => {
                    logger.info(`${process.pid} is connected http://localhost:${this.port}`);
                }).on('error', err => {
                    logger.error(err);
                    process.exit(1);
                });

                console.log("dev mode");

                cluster.on('exit', (worker, code, signal) => {
                    logger.info(`${process.pid} is disconnected`);
                    cluster.fork();
                });
            }
        }catch(e){
            logger.error("app start error");
        }
    }
};

export default Index;

