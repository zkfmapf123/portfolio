type AuthDto = {
    email : string;
    password: string;
};

export type LoginDto = AuthDto & {
    // email
    // password
}

export type JoinDto = AuthDto & {
    // email
    // password
    sex : boolean;
    age: number;
    name : string;
};

export type getUserType = {
    id : string;
    email :string;
    password: string;
    name : string;
};

export type changePasswordType = {
    option : "forget" | "rename",
    password ?: string;
    email ?: string;
}


