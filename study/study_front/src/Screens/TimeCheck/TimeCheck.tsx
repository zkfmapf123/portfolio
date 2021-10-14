import { CommonActions, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ArrowButton from "~/Components/AbsoluteIcons/ArrowButton";
import ScrollTodayButton from "~/Components/AbsoluteIcons/ScrollTodayButton";
import ListView from "~/Components/Home/ListView";
import TimeCheckListView from "~/Components/Home/TimeCheckListView";
import SessionSubmit from "~/Components/SessionSubmit";
import TimeCheckFooterButton from "~/Components/TimeCheck/TimeCheckFooterButton";
import TimeItem from "~/Components/TimeCheck/TimeItem";
import TimeTouchButton from "~/Components/TimeCheck/TimeTouchButton";
import TitleLabel from "~/Components/TitleLabel";
import TopShortBorder from "~/Components/TopShortBorder";
import Day from "~/Library/Day";
import Style from "./Style";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import { Color } from "~/Library/Color";
import AsyncStorage from "@react-native-community/async-storage";
import { SERVER_API } from "~/Library/Const";
import StudyRegisterModal from "~/Components/TimeCheck/StudyRegisterModal";
import Modal from "react-native-modal";
import TimeFormatting from "./TimeFormatting";
import LoadingView from "~/Components/LoadingView/LoadingView";
import { BackHandler, Dimensions, ToastAndroid } from "react-native";
import Animated from "react-native-reanimated";
import { Fonts } from "~/Library/Fonts";

interface Props{
    navigation : any;
}

const TimeCheck = ({navigation} : Props) =>{
    const [loading, setLoading] = useState<boolean>(true);
    const [modal, setModal] = useState<boolean>(false);
    const [curDay , setCurDay] = useState<string>(`${Day.CURRENT_YEAR}년 ${Day.ZERO_CURRENT_MONTH}월 ${Day.ZERO_CURRENT_DATE}일`);
    const [serverDay, setServerDay] = useState<string>(`${Day.CURRENT_YEAR}${Day.ZERO_CURRENT_MONTH}${Day.ZERO_CURRENT_DATE}`)
    const [totalTime, setTotalTime] = useState<number>(0);
    const captureRef : unknown= useRef();
    const [studyArr, setStudyArr] = useState([{
        id : "",
        todo : "",
        study_time : "",
        standard : ""
    }]);

    const getPhotouri = async() =>{
        const uri = await captureRef.current.capture();
        return uri;
    }

    const imageShare = async(social : any) =>{
        try{
            const uri = await getPhotouri();
            const options = {
                title : "Share Title",
                message : "Share Message",
                url : uri,
                type : "image/jpeg"
            };

            if(social === null) await Share.open(options);
            else await Share.shareSingle({
                    ...options,social
                });
        }catch(e){
            console.log(e);
        }
    }

    const update = async() : Promise<void> =>{
        try{
            const userId = await AsyncStorage.getItem("userId");

            const setting ={
                method : "POST",
                headers :{
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    id : `${userId}`,
                    cur_date : `${serverDay}`
                })
            };

            const response = await fetch(`${SERVER_API}/study`,setting);
            const {study, timeTotal} = await response.json();

            await studySetting(study,timeTotal);

            setTimeout(async()=>{ 
                setLoading(false);
            },1000);
        }catch(e){
            console.error(e);
        }
    }

    const deleteStudy = async(studyId : string) : Promise<void> => {
        try{
            const userId = await AsyncStorage.getItem("userId");

            const setting ={
                method : "DELETE",
                headers :{
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    id : `${userId}`,
                    studyId : `${studyId}`,
                    cur_date : `${serverDay}`
                })
            };

            const response = await fetch(`${SERVER_API}/study/delete`,setting);
            const {study, timeTotal} = await response.json();
            studySetting(study,timeTotal);
        }catch(e){
            console.error(e);
        }
    }

    const studySetting = async(study : any, timeTotal : any) =>{
        setTotalTime(timeTotal[0].UserSum);
        if(study.length === 0) setStudyArr([]);
        else setStudyArr(study);
    }

    useFocusEffect(
        useCallback(()=>{
            const onBackPress = () =>{
                navigation.navigate('Home');
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress',onBackPress);

            return()=>{
                BackHandler.removeEventListener('hardwareBackPress',onBackPress);
            }
        },[]),
    );

    const modalExit = () =>{
        setModal(false);

        ToastAndroid.showWithGravityAndOffset(
            '새로고침을 해주세요',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            1,
            10
        )
    }

    useEffect(()=>{
        setLoading(true); //true롤 해야함
        update();
    },[]);

    if(loading){
        return(
            <LoadingView url={require("~/Assets/timeLoading.gif")}/>
        )
    }else{
        return(
            <Style.Container>
                <Modal 
                      isVisible={modal}
                      useNativeDriver={true}
                      hideModalContentWhileAnimating={true}
                      style={{flex :1, justifyContent: "center", alignItems:"center"}}>
                    <StudyRegisterModal onPress={()=>modalExit()}/>
                </Modal>
                <ViewShot ref={captureRef} options={{format : "jpg", quality:0.9}} style={{flex: 1, backgroundColor:`${Color.ENTIRE_BACKGROUND_COLOR}`}}>
                    <Style.Header>
                        <Style.TopAbsolutView>
                            <ArrowButton onPress={()=>navigation.openDrawer()}/>
                            <ScrollTodayButton iconName="tago" onPress={()=>navigation.dispatch(CommonActions.navigate("History"))}/>
                        </Style.TopAbsolutView>
                        <TitleLabel title="TIMER"/>
                        <Style.HeaderDayTitleLabel>{curDay}</Style.HeaderDayTitleLabel>
                        <Style.HeaderLabel>총 공부시간</Style.HeaderLabel>
                        <Style.TimeLabel>{TimeFormatting.numberToStringTime(totalTime)}</Style.TimeLabel>
                        <Style.HeaderButtonView>
                            <TimeTouchButton title="새로고침" backColor="#FAF7F6" textColor="#362F2D" onPress={()=>update()}/>
                            <TimeTouchButton title="추가" backColor="#FAF7F6" textColor="#362F2D" onPress={()=>setModal(true)}/>
                        </Style.HeaderButtonView>
                    </Style.Header>
                    <Style.Main>
                        <Style.ScrollColumn>
                            <FlatList 
                                style={{
                                    flex: 1, 
                                    borderStyle: 'dotted', 
                                    borderColor: 'red' }}                                
                                ListEmptyComponent={<TimeCheckListView description="아직 공부한 내용이 없네요"/>}
                                data={studyArr}
                                renderItem={({item, index})=>(
                                    <TimeItem
                                            id={item.id}
                                            index={index+1}
                                            todo={item.todo}
                                            standard={item.standard}
                                            study_time={item.study_time}
                                            onPressTimes={()=>navigation.dispatch(CommonActions.reset({ index : 0, routes : [
                                                                                                                                {name : "Timer",
                                                                                                                                 params : {
                                                                                                                                     id : item.id,
                                                                                                                                     todo : item.todo,
                                                                                                                                     standard : item.standard,
                                                                                                                                     time : item.study_time
                                                                                                                                 }},
                                                                                                                            ]}))}
                                            onPressDelete={()=>deleteStudy(item.id)}/>
                                )}
                                keyExtractor={((item, index)=> {return String(item.id)})}
                            />
                        </Style.ScrollColumn>
                    </Style.Main>
                </ViewShot>
                    <Style.BannerFooterView>
                        <Style.FooterTouchButtonView>
                            <TimeCheckFooterButton 
                                title="친구에게 공유하기"
                                backColor="#FAF7F6"
                                textColor="#5E5732"
                                onPress={()=>imageShare(null)}/>
                            <TimeCheckFooterButton 
                                title="공부 끝내기"
                                backColor="#6C8170"
                                textColor="#FAF7F6"
                                onPress={()=>navigation.dispatch(CommonActions.navigate('History'))}/>
                        </Style.FooterTouchButtonView>
                    </Style.BannerFooterView>
            </Style.Container>
        )
    }
    
};

export default TimeCheck;