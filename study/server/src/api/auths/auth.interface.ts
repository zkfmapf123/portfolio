import { changePasswordType, getUserType } from "./auth.dto";

export interface ILogin {
    isCorrectPassword(cryptPassword : string) : Promise<returnIsCorrectPw>;
};

export interface IJoin {
    isValidEmailAndName() : Promise<returnIsValidEmail>;
    createUser() : Promise<returnCreateUser>;
    getUser() : Promise<returnUser>;
};

export interface IMailer {
    sendEmail() : Promise<returnSendEmail>;
    changeMyPassword(password: string) : Promise<returnRename>;
};

// login
export type returnIsLoginType = [boolean, Error | undefined];

// join
export type returnIsValidEmail = [boolean, Error | undefined];
export type returnIsCorrectPw = [boolean, Error | undefined];
export type returnCreateUser = [boolean, Error | undefined];
export type returnUser = [getUserType | undefined,Error | undefined]

// forget 
export type returnSendEmail = [boolean, Error |undefined];

// rename
export type returnRename = [boolean, Error | undefined];