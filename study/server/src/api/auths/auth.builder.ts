import { JoinDto } from "./auth.dto";
import AuthService from "./auth.service";

export class AuthServiceBuidler { 
    private email :string;
    private password : string;
    private sex : boolean;
    private age: number;
    private name :string;

    setEmail(email : string) : this {
        this.email = email;
        return this;
    };

    setPassword(password : string) :this {
        this.password = password;
        return this;
    };

    setSex(sex : boolean ) :this {
        this.sex= sex;
        return this;
    };

    setAge(age : number) :this {
        this.age= age;
        return this;
    };

    setName(name : string) :this {
        this.name = name;
        return this;
    };

    create() : AuthService{
        return new AuthService(
            this.email,
            this.password,
            this.name,
            this.sex,
            this.age
        )
    }
}

export const AuthBuilderMappging = async(dto : JoinDto, builder: AuthServiceBuidler) : Promise<AuthService> =>{
    const {email, password, sex, age, name} = dto;

    return builder
      .setEmail(email)
      .setAge(age)
      .setName(name)
      .setPassword(password)
      .setSex(sex)
      .create();
}