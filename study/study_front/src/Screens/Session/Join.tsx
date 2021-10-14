import React, { useEffect, useState } from "react";
import SessionSubmit from "~/Components/SessionSubmit";
import Style from "./Styles";
import Func from "~/Library/Func";
import SessoinDialogBox from "~/Components/SessoinDialogBox";
import { SERVER_API } from "~/Library/Const";
import DialogBox from "~/Components/DialogBox";

interface Props{
    navigation : any;
}

const Join = ({navigation} : Props) =>{
    const [name, setName] = useState<string>("");
    const [email, setEamil] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwrodCheck, setPasswordCheck] = useState<string>("");
    const [dialog, setDialog] = useState(false);
    const [access , setAccess] = useState(false);

    const update = async() : Promise<void>=>{
        if(Func.joinValid({email : email, name : name, password : password, passwordCheck : passwrodCheck})){
            //회원가입 진행   
            try{
                const setting = {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        email : email,
                        name : name,
                        password : password,
                    })
                };
                const response = await fetch(`${SERVER_API}/auth/register`,setting);
                if(response.status === 202) setDialog(true); 
                else setAccess(true);
            }catch(e){
                console.error(e);
            }
        }else{
            setDialog(true);
        }
    }

    const initial = () : void =>{
        setEamil("");
        setName("");
        setPassword("");
        setPasswordCheck("");
        setDialog(false);
    }

    useEffect(()=>{
        initial();
    },[])

    return(
        <Style.Container>
            {
                dialog && <SessoinDialogBox title="Notice"
                                            onPress={()=>initial()}
                                            emailDescription="1. 아이디는 공백없이 2~20글자 이내여야 합니다."
                                            nameDescriptoin="2. 이름은 공백없이 2~10글자 이내여야 합니다"
                                            passwordDescirption="3. 비밀번호는 공백없이 2~10글자 이내여야 합니다"
                                            passwordDescription2="4. 두 비밀번호는 같아야 합니다"/>
            }
            {
                access && <DialogBox title="Access"
                                     descriptoin="회원가입이 되었습니다"
                                     onPress={()=>navigation.navigate("Login")}/>
            }
            <Style.Main>
                <Style.SessionTitleLabel>Sign up</Style.SessionTitleLabel>
                <Style.InputText placeholder="id" keyboardType="twitter" style={{fontWeight:"bold", paddingLeft:40}} onChangeText={text => setEamil(text)} value={email}/>
                <Style.InputText placeholder="Name" keyboardType="twitter" style={{fontWeight:"bold",paddingLeft : 40}} onChangeText={text => setName(text)} value={name}/>
                <Style.InputText placeholder="Password" keyboardType="twitter" style={{fontWeight:"bold",paddingLeft : 40}} onChangeText={text =>setPassword(text)} secureTextEntry={true} value={password}/>
                <Style.InputText placeholder="Check pw" keyboardType="twitter" style={{fontWeight:"bold",paddingLeft : 40}} onChangeText={text =>setPasswordCheck(text)} secureTextEntry={true} value={passwrodCheck}/>
                <SessionSubmit title="회원가입" onPress={()=>update()}/>
            </Style.Main>
        </Style.Container>
    );
};

export default Join;