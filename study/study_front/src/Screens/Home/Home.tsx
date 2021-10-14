import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, LogBox } from "react-native";
import {AndroidBackHandler} from 'react-navigation-backhandler';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Calendars from "~/Components/Home/Calendars";
import TodoItem from "~/Components/Home/TodoItem";
import TitleLabel from "~/Components/TitleLabel";
import TopShortBorder from "~/Components/TopShortBorder";
import Day from "~/Library/Day";
import Style from "./Style";
import Icons from "react-native-vector-icons/Feather";
import { TTodayMethod, TTodoMethod } from "~/Library/Types";
import DialogBox from "~/Components/DialogBox";
import ListView from "~/Components/Home/ListView";
import ArrowButton from "~/Components/AbsoluteIcons/ArrowButton";
import ScrollTodayButton from "~/Components/AbsoluteIcons/ScrollTodayButton";
import AsyncStorage from "@react-native-community/async-storage";
import { SERVER_API } from "~/Library/Const";
import TodayHeaderView from "~/Components/Home/TodayHeaderView";
import DateTimePicker from "@react-native-community/datetimepicker";
import TodayItem from "~/Components/Home/TodayItem";
import LoadingView from "~/Components/LoadingView/LoadingView";
import Banner from "~/Components/Advertisements/Banner";
import ExitDialogBox from "~/Components/AddEventListener/ExitDialogBox";
import { useFocusEffect } from "@react-navigation/core";

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface Props{
    navigation : any;
}

let timeSet : Set<string>;

const Home = ({navigation} : Props) =>{
    const [backModal, setBackModal] = useState<boolean>(false);
    const [scroll, setScroll] = useState<any>();
    const [mount , setMount] = useState<boolean>(false);
    const [todayString, setTodayString] = useState<string>(`${Day.CURRENT_MONTH}월 ${Day.CURRENT_DATE}일의 일정`);
    
    // dialog && loading
    const [dialog, setDialog] = useState<boolean>(false);
    const [dialogMessage, setDialogMessage] = useState<string>("완료되었습니다");
    const [loading , setLoading] = useState<boolean>(true);

    const [selectDay, setSelectDay] = useState<string>(`${Day.CURRENT_YEAR}${Day.ZERO_CURRENT_MONTH}${Day.ZERO_CURRENT_DATE}`);  // cur_date
    const [serverDay , setServerDay] = useState<string>(`${Day.CURRENT_YEAR}${Day.ZERO_CURRENT_MONTH}${Day.ZERO_CURRENT_DATE}`);
    //todo
    const [todoArr, setTodoArr] = useState([{
        id : "",
        todo : "",
        isChecked : 0
    }]);
    const [todoRatio, setTodoRatio] = useState<number>(0);
    const [todoStr, setTodoStr] = useState<string>("");

    //today
    const [todayArr, setTodayArr] = useState([{
        id : "",
        todo : "",
        today_time : "",      
    }]);
    const [todayTime , setTodayTime] = useState<string>("");
    const [todayStr, setTodayStr] = useState<string>("");
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false); //datePicker 나오게 하는 hooks
    const [showTodayInput, setTodayInput] =useState<boolean>(false); //datePicker 선택하고 나오는 뷰 

    //처음들어가면 업데이트 받아오는 로직
    //할일목록 추가/삭제/체크
    //오늘의 목록 추가/삭제

    const todayFormat = (day : any) =>{
        const {format} = todayFormatZeroProcedure(day);
        setTodayString(`${format[1]}월 ${format[2]}일의 일정`);
        setSelectDay(`${format[0]}${format[1]}${format[2]}`);
        setMount(!mount);
    }

    const todayFormatZeroProcedure = (day : any) : any =>{
        let format = day.dateString.split("-");
        setServerDay(`${format[0]}${format[1]}${format[2]}`);
        if(+format[1] < 10) format[1] = format[1].toString().substr(1,1);
        if(+format[2] < 10) format[2] = format[2].toString().substr(1,1);
        return {format};
    }

    //시작 할때 update
    const update = async() =>{
        try{
            const id = await AsyncStorage.getItem("userId");
            const setting = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: `${id}`,
                    cur_date : `${serverDay}`
                })
            };

            const response = await fetch(`${SERVER_API}`,setting);
            const {todo, today, ratio} = await response.json();
            setTodoArr(todo);
            setTodoRatio(ratio[0].ratio);
            setTodayArr(today);

            setTimeout(()=>{
                setLoading(false);
                navigation.openDrawer();
            },500);
        }catch(e){
            console.error(e);
        }
    };

    // 할일 목록 추가
    const todoAdd = async(method : TTodayMethod = "add") =>{
        try{
            if(todoArr.length > 10 || (todoStr.length < 1 || todoStr.length > 15)){
                settingMessageBox("할일목록은 최대가 10개 입니다 (글자수 제한 1~15글자 내외)");
            }else{
                setTodoArr([]);
                const id = await AsyncStorage.getItem("userId");
                //중복검사
                const setting = {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: `${id}`,
                        cur_date : `${serverDay}`,
                        todo: `${todoStr}`,
                        method: `${method}`
                    })
                };
    
                setTodoStr("");
                const response = await fetch(`${SERVER_API}/todo`,setting);
                const {todo, ratio} = await response.json();
                await settingTodoArrServerData(todo, ratio[0].ratio);
            }
        }catch(e){
            console.error(e);
        }
    }

    // 할일 체크 및 삭제
    const todoCheckAndDelete = async(todoId : string, method : TTodoMethod) =>{
        try{
            if(todoArr.length === 0){
                settingMessageBox("더이상 지울 할일목록이 없습니다");
            }else{
                setTodoArr([]);
                const id = await AsyncStorage.getItem("userId");
                //중복검사
                const setting = {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: `${id}`,
                        cur_date : `${serverDay}`,
                        todoId: `${todoId}`,
                        method: `${method}`
                    })
                };

                const response = await fetch(`${SERVER_API}/todo`,setting);
                const {todo, ratio} = await response.json();
                await settingTodoArrServerData(todo, ratio[0].ratio);
            }
        }catch(e){
            console.error(e);
        }
    }

    //메시지 보내기 (공통)
    const settingMessageBox = (message : string)=>{
        setTodoStr("");
        setDialogMessage(message);
        setDialog(true);
    }

    // 할일 목록 전용
    const settingTodoArrServerData = async(serverTodo : any, serverRatio : any) : Promise<void> =>{
        setTodoArr(serverTodo);
        setTodoRatio(serverRatio);
    }

    const todayAdd = async(method : TTodoMethod = "add")=>{
        try{
            const id = await AsyncStorage.getItem("userId");
            
            if(todayStr.length < 1 || todayStr.length > 15){
                setDialogMessage("글자수 제한 1~15글자 내외");
                setDialog(true);
            }else{
                setTodayArr([]);     //오늘의 목록 배열
                const setting = {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: `${id}`,
                        cur_date : `${serverDay}`,
                        today: `${todayStr}`,
                        today_time: `${todayTime}`,
                        method : `${method}`
                    })
                }
                setTodayStr("");
                const response = await fetch(`${SERVER_API}/today`,setting);
                const {today} = await response.json();
                setTodayArr(today);
                setTodayInput(false);
            }
        }catch(e){
            console.error(e);
        }  
    }

    //할일 삭제
    const todayDelete = async(todayId : string, method : TTodoMethod = "delete")=>{
        try{
            setTodayArr([]);
            const id = await AsyncStorage.getItem("userId");
            const setting = {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: `${id}`,
                    cur_date : `${serverDay}`,
                    todayId : `${todayId}`,
                    method : `${method}`
                })
            };

            const response = await fetch(`${SERVER_API}/today`,setting);
            const {today} = await response.json();
            setTodayArr(today);
            setTodayInput(false);
        }catch(e){
            console.error(e);
        }
    }

    const dateChange=(event ?: any, selectedDate ?: any)=>{
        setShowDatePicker(false);
        if(selectedDate !== undefined){
            const currentDate = selectedDate || new Date();
            const hours : string = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : `${currentDate.getHours()}`;
            const minutes : string = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : `${currentDate.getMinutes()}`;
            const timeString = `${hours}${minutes}`;
            setTodayTime(timeString);
            setTodayInput(true);
        }else{
            setDialogMessage("취소되었습니다");
            setDialog(true);
            setTodayTime("");
        }
    }

    const scrollTodo = () =>{
        scroll.scrollTo({x : 0, y: 400}); //위치가 애매하다..
    }

    const scrollToday =() =>{
        scroll.scrollToEnd()
    }

    useFocusEffect(
        useCallback(()=>{
            const onBackPress =() =>{
                setBackModal(true);
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress',onBackPress);
            return()=>{
                BackHandler.removeEventListener('hardwareBackPress',onBackPress);
            }
        },[]),
    );

    useEffect(()=>{
        update();
    },[mount]);

    if(loading){
        return(
            <LoadingView url={require("~/Assets/timeLoading.gif")}/>
        )
    }else{
        return(
            <Style.Container>
                {
                    backModal &&
                    <ExitDialogBox 
                        onPressCancle={()=>setBackModal(false)}
                        onPressExit={()=>BackHandler.exitApp()}/>

                }
                {
                    dialog && <DialogBox title="알림" descriptoin={dialogMessage} onPress={()=>setDialog(false)}/>
                }
                {
                    showDatePicker && 
                    <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    display="clock"
                                    onChange={dateChange}/>
                }
                <ScrollView style={{flex:1}}
                            ref={(scroll) => setScroll(scroll)}>
                    <Style.Header>
                    <Style.TopAbsoluteView>
                        <ArrowButton onPress={()=>navigation.openDrawer()}/>
                        <ScrollTodayButton iconName="checkcircleo" onPress={()=>scrollTodo()}/>
                    </Style.TopAbsoluteView>
                        <TitleLabel title="PLANNER"/>
                        <Calendars onPress={(day: any) => todayFormat(day)}/>
                    </Style.Header>
                    <Style.MiddleColum>
                        <Style.MainLabel>* {todayString} *</Style.MainLabel>
                    </Style.MiddleColum>
                    <Style.Main>
                        <FlatList
                            style={{flex : 1}}
                            ListHeaderComponent={
                            <Style.TodoListHeaderView>
                                <Style.MainRatioLabel>일일목표 {todoRatio}%</Style.MainRatioLabel>
                            </Style.TodoListHeaderView>}
                            ListFooterComponent={<Style.InputTextView>
                                                    <Style.TextInput
                                                                    textAlign="center"
                                                                    placeholder="할일을 입력하세요"
                                                                    onChangeText={text => setTodoStr(text)}
                                                                    keyboardType="twitter"
                                                                    style={{fontWeight:"bold"}}
                                                                    value={todoStr}/>
                                                    <Style.ToucuButton onPress={()=>todoAdd()}>
                                                        <Icons name="check" size={25}/>
                                                    </Style.ToucuButton>
                                                </Style.InputTextView>}  
                            ListEmptyComponent={<ListView description="공부를 시작해 볼까요?"/>}
                            data={todoArr}
                            renderItem={({item, index})=>(
                                <TodoItem 
                                    title={item.todo} 
                                    check={item.isChecked === 0 ? true : false}
                                    onCheck={()=>todoCheckAndDelete(`${item.id}`,"check")}
                                    onDelete={()=>todoCheckAndDelete(`${item.id}`,"delete")}/>
                            )}
                            keyExtractor={(item, index)=>{ return String(index)}}
                        />
                        <Style.SpaceViwe/>
                        <FlatList
                                ListHeaderComponent={<TodayHeaderView/>}
                                ListFooterComponent={
                                    showTodayInput ?
                                    (<Style.InputTextView>
                                        <Style.InputTextTimeLabel>{todayTime.toString().substring(0,2)} : {todayTime.toString().substring(2,4)}</Style.InputTextTimeLabel>
                                        <Style.TextInput
                                                        textAlign="center"
                                                        placeholder="할일을 입력하세요"
                                                        onChangeText={text => setTodayStr(text)}
                                                        keyboardType="twitter"
                                                        style={{fontWeight:"bold"}}
                                                        value={todayStr}/>
                                        <Style.ToucuButton onPress={()=>todayAdd()}>
                                            <Icons name="check" size={25}/>
                                        </Style.ToucuButton>
                                    </Style.InputTextView>)
                                    :
                                    (<Style.TodayTouchButton onPress={()=>setShowDatePicker(true)}>
                                        <Icons name="clock" size={30} color={"#CDC8C8"}/>
                                    </Style.TodayTouchButton>)
                                }
                                ListEmptyComponent={<ListView description="오늘은 어떤 하루를 보낼까요?"/>}
                                data={todayArr}
                                renderItem={({item, index})=>(
                                    <TodayItem
                                        title={item.todo}
                                        time={item.today_time}
                                        onDelete={()=>todayDelete(item.id, "delete")}/>
                                )}
                                keyExtractor={(item, index)=>{return String(index)}}
                                />
                    </Style.Main>
                    <Style.Footer>
                    </Style.Footer>
                </ScrollView>
                {/* <Style.BannerView>
                    <Banner/>
                </Style.BannerView> */}
            </Style.Container>
        )
    }

};

export default Home;