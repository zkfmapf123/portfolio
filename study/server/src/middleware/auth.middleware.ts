import { Handler, NextFunction, Request, Response } from "express";
import { JwtRepo } from "../lib/jwt";
import { BadRequestException, UnauthorizationException } from "../common/exceptions";

export const verifyJsonWebToken = (): Handler => (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['access-token'];
  const [a,b,c,path] = req.path.split("/");

  // 1. 토큰이 없는 경우
  if(token === undefined){

    // 1. 1) 로그인이나 회원가입일 경우
    if(path === 'login' 
    || path === 'join' 
    || path === 'forget'
    || path === 'logout'){
      return next();
    };

    // 1. 2) 그냥 없는 경우 401
    return res
      .json(new UnauthorizationException())
  };

  // 2. 토큰이 존재하는 경우
  const [verifyToken, tokenError] = JwtRepo.verify(token);

  // 2. 1) 토큰 만료
  if(tokenError === 'expired'){
    return res
      .clearCookie('access-token')
      .json(new UnauthorizationException())
  };

  // 2. 2) 잘못된 접근
  if(tokenError === 'not verify'){
    return res
      .clearCookie('access-token')
      .json(new BadRequestException())
  };

  // 2. 3) 정상적인 토큰이 존재함에도 불구하고, 로그인, 회원가입을 하는 경우
  if(path === "login" 
  || path === "join" 
  || path === "forget"){
    return res
      .json(new BadRequestException())
  }

  // 2. 4) 로그아웃 할경우
  if(path === "logout"){
    return next();
  }
  
  next();
};