import { Request, Response,NextFunction } from "express"

export const verifyHome = async(req: Request, res :Response ,next : NextFunction) : Promise<any>=>{
    try{
        console.log("home middleware");
        
        next();
    }catch(e){
        console.error(e);
    }
}