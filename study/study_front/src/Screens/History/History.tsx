import { parse } from "@babel/core";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import ArrowButton from "~/Components/AbsoluteIcons/ArrowButton";
import LoadingView from "~/Components/LoadingView/LoadingView";
import TopShortBorder from "~/Components/TopShortBorder";
import { SERVER_API } from "~/Library/Const";
import Day from "~/Library/Day";
import TimeFormatting from "../TimeCheck/TimeFormatting";
import Style from "./Style";

interface Props{
    navigation : any;
}

const History = ({navigation} : Props)=>{
    const [loading, setLoading] = useState<boolean>(true);
    const [curToday, setCurToday] = useState<string>(`${Day.CURRENT_YEAR}${Day.ZERO_CURRENT_MONTH}${Day.ZERO_CURRENT_DATE}`);
    const [yesToday, setYesToday] = useState<string>(`${Day.YESTERDAY_YEAR}${Day.ZERO_YESTER_MONTH}${Day.ZERO_YESTER_DATE}`);
    const [curTodayString, setCurTodayString] = useState<string>(`${Day.CURRENT_MONTH}월 ${Day.CURRENT_DATE}일`);
    const [yesTodayString, setYesTodayString] = useState<string>(`${Day.YESTERDAY_MONTH}월 ${Day.YESTERDAY_DATE}일`);
    const [todayUserTime, setTodayUserTime] = useState<number>(0);
    const [todayEntireTime, setTodayEntireTime] = useState<number>(0);
    const [yesUserTime, setYesUserTime] = useState<number>(0);
    const [yesEntireTime, setYesEntireTime] = useState<number>(0);

    const [todayResult , setTodayResult] = useState<string>("");
    const [yesResult, setYesResult] = useState<string>("");

    const update = async() : Promise<void> =>{
        try{
            const userId = await AsyncStorage.getItem("userId");

            const setting ={
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id : `${userId}`,
                    prevDate : `${yesToday}`,
                    nextDate : `${curToday}`
                })
            };

            const response = await fetch(`${SERVER_API}/study/history`,setting);
            const {curTotal, yesTotal} = await response.json();
            
            const curUserSum = curTotal[0].UserSum;
            const curYesSum = curTotal[0].totalSum;

            const yesUserSum = yesTotal[0].UserSum;
            const yesSum = yesTotal[0].totalSum;

            if(curUserSum === null) setTodayUserTime(0);
            else setTodayUserTime(parseInt(curUserSum));

            if(curYesSum === null) setTodayEntireTime(0);
            else setTodayEntireTime(parseInt(curYesSum));

            if(yesUserSum === null) setYesUserTime(0);
            else setYesUserTime(parseInt(yesUserSum));

            if(yesSum === null) setYesEntireTime(0);
            else setYesEntireTime(parseInt(yesSum));

            setTimeout(()=>{
                setLoading(false);
            },1000);
        }catch(e){
            console.error(e);
        }
    }

    
    useFocusEffect(
        useCallback(()=>{
            const onBackPress=()=>{
                navigation.navigate('TimeCheck');
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress',onBackPress);
            return()=>{
                BackHandler.removeEventListener('hardwareBackPress',onBackPress);
            }
        },[]),
    );

    useEffect(()=>{
        setLoading(true);
        update();
    },[]);

    if(loading){
        return(
            <LoadingView url={require("~/Assets/historyLoading.gif")}/>
        )
    }else{
        return(
            <Style.Container>
                <Style.Header>
                    <ArrowButton onPress={()=>navigation.openDrawer()}/>
                    <Style.HeaderH></Style.HeaderH>
                    <Style.HeaderLabel>HISTORY</Style.HeaderLabel>
                    <TopShortBorder/>
                </Style.Header>
                <Style.Main>
                    <Style.Column>
                        <Style.ColumnTitleLabel>오늘의 공부시간</Style.ColumnTitleLabel>
                        <Style.ColumnDateLabel>{curTodayString}</Style.ColumnDateLabel>
                        <Style.MyTimeView>
                            <Style.TimeTopLabel>나의 공부시간</Style.TimeTopLabel>
                            <Style.TimeMidLabel>{TimeFormatting.numberToStringTime(todayUserTime)}</Style.TimeMidLabel>
                        </Style.MyTimeView>
                        <Style.TimeTopLabel>다른 사용자의 공부시간</Style.TimeTopLabel>
                        <Style.TimeMidLabel>{TimeFormatting.numberToStringTime(todayEntireTime)}</Style.TimeMidLabel>                
                    </Style.Column>
                    <Style.Column>
                        <Style.ColumnTitleLabel>어제의 공부시간</Style.ColumnTitleLabel>
                        <Style.ColumnDateLabel>{yesTodayString}</Style.ColumnDateLabel>
                        <Style.MyTimeView>
                            <Style.TimeTopLabel>나의 공부시간</Style.TimeTopLabel>
                            <Style.TimeMidLabel>{TimeFormatting.numberToStringTime(yesUserTime)}</Style.TimeMidLabel>
                        </Style.MyTimeView>
                        <Style.TimeTopLabel>다른 사용자의 공부시간</Style.TimeTopLabel>
                        <Style.TimeMidLabel>{TimeFormatting.numberToStringTime(yesEntireTime)}</Style.TimeMidLabel>                    
                    </Style.Column>
                </Style.Main>
            </Style.Container>
        );
    }
};

export default History;