import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import SessionSubmit from "~/Components/SessionSubmit";
import Style from "./Styles";
import Icons from "react-native-vector-icons/Feather";
import Func from "~/Library/Func";
import DialogBox from "~/Components/DialogBox";
import { SERVER_API } from "~/Library/Const";
import { CommonActions } from "@react-navigation/native";
import useStore from "~/userStore";
import MainLoading from "~/Components/LoadingView/MainLoading";

interface Props{
    navigation : any;
}

const Login = ({navigation} : Props) =>{
    const [loading ,setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [dialog , setDialog] = useState<boolean>(false);

    const {MyInfo} = useStore();

    const update = async() :Promise<void> =>{
        if(Func.loginValid({email : email, password : password})){
            try{
                const setting = {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        email : email,
                        password : password,
                    })
                };

                const response = await fetch(`${SERVER_API}/auth/valid`,setting);
                if(response.status === 200){
                    const user = await response.json();
                    await userRegister(user.id, user.nickName);
                }else{
                    userNotValid();
                }
            }catch(e){
                console.error(e);
            }
        }else{
            userNotValid();
        }
    }

    const userNotValid = () : void =>{
        setEmail("");
        setPassword("");
        setDialog(true);
    }

    const userRegister = async(userId : string, nickName : string) :Promise<void>=>{
        try{
            MyInfo.setNickname(nickName);
            await AsyncStorage.setItem("userId",`${userId}`);
            await navigation.dispatch(CommonActions.reset({
                index : 0,
                routes : [{name : "Home"}]
            }));
        }catch(e){
            console.error(e);
        }
    }

    useEffect(()=>{
        setEmail("");
        setPassword("");
    },[]);

    if(loading){
        return(
            <MainLoading/>
        )
    }else{
        return(
            <Style.Container>
                {
                    dialog && <DialogBox title="Notice" descriptoin="유효한 이메일 또는 비밀번호가 틀립니다" onPress={()=>setDialog(false)}/>
                }
                <Style.Main>
                    <Style.SessionTitleLabel>Log in</Style.SessionTitleLabel>
                    <Style.InputText placeholder="id" keyboardType="twitter" style={{fontWeight:"bold", paddingLeft:40}} onChangeText={text => setEmail(text)} value={email}/>
                    <Style.InputText placeholder="Password" keyboardType="twitter" style={{fontWeight:"bold", paddingLeft:40}} onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}/>
                    <Style.IconsView>
                        <Icons name="check" size={15} color="gray"/>
                        <Style.SmallLabel>자동 로그인</Style.SmallLabel>
                    </Style.IconsView>
                    <SessionSubmit title="로그인" onPress={()=>update()}/>
                    <SessionSubmit title="회원가입" onPress={()=>navigation.navigate("Join")}/>
                </Style.Main>
            </Style.Container>
        );
    }
};

export default Login;