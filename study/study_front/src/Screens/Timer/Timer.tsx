import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TTimeWatch } from "~/Library/Types";
import Style from "./Style";
import TimeFormat from "~/Screens/TimeCheck/TimeFormatting";
import TitleLabel from "~/Components/TitleLabel";
import { SERVER_API } from "~/Library/Const";
import { BackHandler } from "react-native";

interface Props{
    route : any;
    navigation : any;
}

const Timer = ({route, navigation}:Props) =>{
    const {id, todo, standard, time} = route.params;
    const [step, setStep] = useState<TTimeWatch>("start");
    let [timeNumber, setTimeNumber] = useState<number>(time);
    const [timeString, setTimeString] = useState<string>(TimeFormat.numberToStringTime(time));
    const countRef = useRef(null);

    const serverRegister = async() : Promise<void> =>{
        try{
                const userId = await AsyncStorage.getItem("userId");

                const setting ={
                    method : "PUT",
                    headers :{
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify({
                        id : `${userId}`,
                        studyId : `${id}`,
                        time : `${timeNumber}`
                    })
                };

                const response = await fetch(`${SERVER_API}/study/timeAdd`,setting);
            }catch(e){
                console.error(e);
            }
    }

    const convertTime = (time : number) : void =>{
        let hour;
        let minute;
        let secound;

        hour = Math.floor(time / 3600);
        secound = time % 3600;
        minute = Math.floor(secound / 60);
        secound  = Math.floor(secound % 60);

        if(hour < 10) hour = `0${hour}`;
        if(minute < 10) minute = `0${minute}`;
        if(secound <10) secound = `0${secound}`;

        setTimeString(`${hour} : ${minute} : ${secound}`);
    }

    const start = () =>{
        setStep("pause");

        countRef.current = setInterval(()=>{
            setTimeNumber(timeNumber++);
            convertTime(timeNumber);            
        },1000);
    }

    const pause = () =>{
        clearInterval(countRef.current);
        setStep("start");
    }


    useFocusEffect(
        useCallback(()=>{
            const onBackPress=()=>{
                navigation.dispatch(CommonActions.navigate("TimeCheck"));
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress',onBackPress);
            return()=>{
                serverRegister();
                clearInterval(countRef.current);
                BackHandler.removeEventListener('hardwareBackPress',onBackPress);
            }
        },[]),
    );    

    useEffect(()=>{
        return()=>{
            serverRegister();
            clearInterval(countRef.current);
        }
    },[])

    return(
        <Style.Container>
            <Style.Header>
                <Style.TitleLabel>{standard}</Style.TitleLabel>
                <Style.MainTodoLabel numberOfLines={1}>{todo}</Style.MainTodoLabel>
            </Style.Header>
            <Style.Main>
                <Style.MainTimeWatchLabel>{timeString}</Style.MainTimeWatchLabel>
            </Style.Main>
            {
                step === "start" ?
                (<Style.Footer>
                    <Style.TouchButton onPress={()=>navigation.dispatch(CommonActions.navigate('TimeCheck'))}>
                        <Style.ButtonLabel>다른 공부하기</Style.ButtonLabel>
                    </Style.TouchButton>
                    <Style.TouchButton onPress={()=>start()}>
                        <Style.ExitLabel>공부 시작하기</Style.ExitLabel>
                    </Style.TouchButton>
                    <Style.TouchButton onPress={()=>navigation.dispatch(CommonActions.navigate('History'))}>
                        <Style.ButtonLabel>통계 보러가기</Style.ButtonLabel>
                    </Style.TouchButton>
                </Style.Footer>)
                :
                (<Style.Footer>
                    <Style.TouchButton onPress={()=>pause()}>
                        <Style.ButtonLabel>중지 하기</Style.ButtonLabel>
                    </Style.TouchButton>
                </Style.Footer>)
            }
        </Style.Container>
    );
};

export default Timer;