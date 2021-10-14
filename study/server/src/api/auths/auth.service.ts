import bcrypt from 'bcrypt';
import config from '../../config';
import nodemailer from 'nodemailer';
import { DBRepo, isDataEmpty, logRepo } from "../../common/utils/index";
import { IJoin, ILogin, IMailer, returnIsLoginType, returnCreateUser, returnIsCorrectPw, returnIsValidEmail, returnSendEmail, returnUser, returnRename } from "./auth.interface";
import { changePasswordType, getUserType } from './auth.dto';

const IS_VALID_EMAIL = 
"select id from users where name = ? or email = ? ";

const CREATE_USER = 
"insert into users(email, password, name, sex, age) values(?,?,?,?,?)";

const RENAME_PASSWORD = 
"update users set password = ? where email = ?";

const GET_USER = 
"select id,email,password,name from users where email = ?"

class AuthService implements ILogin, IJoin, IMailer{

    constructor(
        private readonly email: string | undefined,
        private readonly password: string | undefined,
        private readonly name :string | undefined,
        private readonly sex: boolean | undefined,
        private readonly age: number | undefined
    ){}
    
    async changeMyPassword(password: string): Promise<returnRename> {
        try{
            await DBRepo.getResult({
                query : `${RENAME_PASSWORD}`,
                params : `${password},
                          ${this.email}`
            });

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('change my password')
              .create();
            return [undefined, e];
        }
    }
    
    async getUser(): Promise<returnUser> {
        try{
            const [row] = await DBRepo.getResult({
                query : GET_USER,
                params : `${this.email}`
            });

            return [row as getUserType | undefined, undefined]
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('get users')
              .create();
            return [undefined, e]
        }
    }

    async isValidEmailAndName(): Promise<returnIsValidEmail> {
        try{
            const [row] = await DBRepo.getResult({
                query : IS_VALID_EMAIL,
                params: `${this.name},
                         ${this.email}`
            });

            if(isDataEmpty(row)){
                return [true, undefined];
            };

            return [false, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('is valid email')
              .setUserId(undefined)
              .create();
            return [false, undefined];
        }
    }

    async isCorrectPassword(cryptPassword : string): Promise<returnIsCorrectPw>{
        try{
            const isCorrect = await bcrypt.compare(this.password, cryptPassword);
            return [isCorrect , undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setErrType('error')
              .setTitle('is correct password')
              .create(); 
            return [false, e];
        }
    }

    async createUser(): Promise<returnCreateUser> {
        try{
            const bcryptPassword = await this.getCryptoPassword();
            await DBRepo.getResult({
                query : CREATE_USER,
                params : `${this.email},
                          ${bcryptPassword},
                          ${this.name},
                          ${this.sex ? 1 : 0},
                          ${this.age}`
            });

            return [true, undefined];
        }catch(e){
            return [false, e];
        }
    };

    private async getCryptoPassword(option : 'join' | 'rename' = 'join', password ?: string) : Promise<string> {
        try{
            const salt = await bcrypt.genSalt(+config.hashRound);
            const hash = await bcrypt.hash((option === 'join' ? this.password : password),salt);

            return hash;
        }catch(e){
            logRepo
              .setDescription(e)
              .setTitle('crypt password')
              .setErrType('info')
              .create();

            throw e;
        }
    };

    async sendEmail(): Promise<returnSendEmail> {
        try{
            const transporter = nodemailer.createTransport({
                service : 'gmail',
                host : 'smtp.gamil.com',
                port : 587,
                secure : false,
                auth : {
                    user : 'zkfmapf999@gmail.com',
                    pass : 'dl1ehd2rb3!!'
                }
            });
            
            const renamePassword = await this.getRandPassword();
            await transporter.sendMail({
                from: 'App Commando Team',
                to: this.email,
                subject: `앱특공대 알림 : ${this.email}님의 비밀번호가 변경되었습니다`,
                text: `${this.email} 님의 비밀번호가 \n${123}로 변경되었습니다.\n개수작에 접속한 후 정보창에서 비밀번호를 변경해주세요 ^^`,
                html:
                    `
                <div>
                    <div>
                        <div style="text-align :center">
                            <h2>앱특공대 알림 : ${this.email}님의 비밀번호가 변경되었습니다</h2>
                            <div style="margin : 70px 0px;">
                                <span style="background-color: coral; padding: 20px; margin: auto;">${renamePassword}</span>
                            </div>
                            <p>서비스 이용시 정보창에서 비밀번호를 올바른 비밀번호로 변경해주세요</p>
                            <b>개미처럼 공부해서 수능알 작살내자 화이팅 !!</b>
                        </div>
                    </div>
                </div>
                `
            });

            const cryptPassword = await this.getCryptoPassword('rename',renamePassword);
            await this.changeMyPassword(cryptPassword)

            return [true, undefined];
        }catch(e){
            logRepo
              .setDescription(e)
              .setTitle('send email')
              .setErrType('error')
              .create();
            
            return [false, e];
        }
    };

    private async getRandPassword() : Promise<string> {
        return Math.random().toString(36).substring(2,11);
    }
};

export default AuthService;