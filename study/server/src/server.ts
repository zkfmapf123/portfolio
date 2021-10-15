import { 
  AuthController, 
  AuthServiceBuidler,
  StatisticController,
  StudyController,
  StudyServiceBuilder, 
  TodoController, 
  TodoServiceBuilder} from './api/index';
import App from "./App";
import config from "./config";

(async() => {
  const app = new App({
    controllers: [
      new AuthController( new AuthServiceBuidler()),
      new TodoController( new TodoServiceBuilder()),
      new StudyController( new StudyServiceBuilder()),
      new StatisticController(),
    ],
    port: +config.port,
    dev: config.dev as "dev" | "build"
  });

  await app.listen();
})();