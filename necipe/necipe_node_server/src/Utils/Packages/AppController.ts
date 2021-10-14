import Profiler from "../TimeCheck/Profiler";
import config from "../../Configs/index";

export class AppController {
  protected profiler = Profiler(config.env === "development" ? "development" : "production");
  
  constructor() {
    
  }
}