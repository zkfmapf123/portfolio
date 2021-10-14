import * as jwt from "jsonwebtoken";
import config from '../config';

type JwtPayloadType = {
  id : number,
  email :string,
  name: string,
}

export class JwtRepo {

  static options : jwt.SignOptions = {
    algorithm : 'HS256',
    expiresIn : '60d',
    issuer : 'leedonggyu'
  };

  static async sign(payload : JwtPayloadType, options: jwt.SignOptions = JwtRepo.options) : Promise<string>{
    return jwt.sign(payload, config.jwtScreet, options);
  };

  static verify(token : string, options : jwt.SignOptions = JwtRepo.options) : [JwtPayloadType |undefined, 'expired' | 'not verify' | undefined]{
      try{
        const decodeToken = jwt.verify(token, config.jwtScreet, options) as JwtPayloadType;
        return [decodeToken, undefined];
      }catch(e){

        if(e.name === 'TokenExpiredError'){
          return [undefined, 'expired']
        };

        return [undefined, 'not verify']
      }
  };
};
