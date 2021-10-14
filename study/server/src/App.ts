import express, { Router, Request, Response } from "express";
import helmet from "helmet";
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from "cookie-parser";
import session from "express-session";
import os from "os";
import cluster from "cluster";
import { csrf } from "./middleware/csrf.middleware";
import { verifyJsonWebToken } from "./middleware/auth.middleware";
import { errMiddleware } from "./middleware/err.middleware";
import { Controller } from "./common/interfaces/controller";

type appType = {
  controllers: Controller[];
  port: number;
  dev: "dev" | "build";
}

class App {
  private readonly app: express.Application;
  private readonly port: number;
  private readonly dev: "dev" | "build";
  private readonly cpuNum: number;
    
  constructor({controllers, port, dev} : appType) {
    this.app = express();
    this.port = port;
    this.dev = dev;
    this.cpuNum = os.cpus().length;

    this.initMiddleware();
    this.initContoller(controllers);
    this.initErrorHandling();
  };

  public getServer(){
    return this.app;
  };

  public initServer(){
    
  };

  public initMiddleware(){
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser("study"));
    this.app.use(session({
      saveUninitialized: true,
      resave: false,
      secret: "leedonggyu",
    }));
    this.app.use(csrf());
    this.app.use(verifyJsonWebToken());
  };

  public initErrorHandling(){
    this.app.use(errMiddleware);
  };

  public initContoller(controllers : Controller[]){
    const router = Router();
    router.get('/', (req, res) => res.send("hello world"));

    controllers.forEach((controller : Controller) => {
      router.use(controller.router);
    });
    
    this.app.use('/api', router);
  };
  
  // cluster mode
  public async listen(){
    try {
      if (this.dev === "build" && cluster.isMaster) {
        for (let i = 0; i < this.cpuNum; i++){
          cluster.fork();
        }
      } else {
        this.app.listen(this.port, () => {
          console.log(`pid : ${process.pid}\nmode: ${this.dev}\n${this.port} is connected`);
        }).on("error", err => {
          process.exit(1);
        });
  
        cluster.on('exit', (worker, code, signal) => {
          cluster.fork();
        });
      }
    } catch (e) {
      console.error(e);
    }    
  };

};

export default App;