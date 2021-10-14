import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import TitleLabel from "~/Components/TitleLabel";
import { SERVER_API } from "~/Library/Const";
import {BarChart} from "react-native-chart-kit"
import Style from "./Style";
import { BackHandler, Dimensions, processColor } from "react-native";
import { Color } from "~/Library/Color";
import LoadingView from "~/Components/LoadingView/LoadingView";
import StatisticItem from "~/Components/Statistic/StatisticItem";
import ArrowButton from "~/Components/AbsoluteIcons/ArrowButton";
import {PieChart} from "react-native-charts-wrapper";
import Banner from "~/Components/Advertisements/Banner";
import { CommonActions } from "@react-navigation/routers";
import { useFocusEffect } from "@react-navigation/core";
import ScrollTodayButton from "~/Components/AbsoluteIcons/ScrollTodayButton";

interface Props{
    navigation : any;
}

const Statistic = ({navigation} : Props) =>{
    const [loading, setLoading] = useState<boolean>(true);
    let [week, setWeek] = useState<Array<number>>([0,0,0,0,0,0,0]);
    let [subjectRatio, setSubjectRatio] = useState([0,0,0,0,0,0,0]);
    const [barChartTitle, setBarChartTitle] = useState<string>("");
    const [scroll, setScroll] = useState<any>();
    
    const [kor, setKor] = useState<Array<any>>([]);               //국어
    const [eng, setEng] = useState<Array<any>>([]);               //영어  
    const [math, setMath] = useState<Array<any>>([]);             //수학
    const [social, setSocial] = useState<Array<any>>([]);         //사회/과학/직업탐구
    const [eng2, setEng2] = useState<Array<any>>([]);             //한문/제2외국어
    const [korKor, setKorKor] = useState<Array<any>>([]);         //한국사
    const [etc, setEtc] = useState<Array<any>>([])                //기타

    const weekString = () : any =>{
        const currentDay = new Date();
        const theYear = currentDay.getFullYear();
        const theMonth = currentDay.getMonth();
        const theDate = currentDay.getDate();
        const theDayOfWeek = currentDay.getDay();
    
        let thisWeek = [];
        for(let i=0; i<7; i++) {
            let resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
            let yyyy = resultDay.getFullYear();
            let mm : string | number = Number(resultDay.getMonth()) + 1;
            let dd : string | number  = resultDay.getDate();
       
            mm = String(mm).length === 1 ? '0' + mm : mm;
            dd = String(dd).length === 1 ? '0' + dd : dd;
       
            thisWeek[i] = `${yyyy}${mm}${dd}`;
        }
    
        return thisWeek;
    }
    
    const thisWeek : any = weekString();

    const update = async() : Promise<void> =>{
        try{
            const id = await AsyncStorage.getItem("userId");

            const setting = {
                method : "POST",
                headers:{
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    id : `${id}`,
                    prevDate : `${thisWeek[0]}`,
                    nextDate : `${thisWeek[6]}`
                })
            };

            const response = await fetch(`${SERVER_API}/statistic`,setting);
            const {barChart, pieChart, list} = await response.json();

            //console.log(pieChart);
            setTimeout(async()=>{
                try{
                    setBarChartTitle(`${thisWeek[0].substring(0,4)}년 ${thisWeek[0].substring(4,6)}월 ${thisWeek[0].substring(6,8)}일 ~ ${thisWeek[6].substring(0,4)}년 ${thisWeek[6].substring(4,6)}월 ${thisWeek[6].substring(6,8)}일`);
                    if(barChart !== 0) await barChartData(barChart);
                    //if(pieChart !== 0) await pieChartData(pieChart);
                    if(list !== 0) await listChartData(list);
                    setLoading(false);    
                }catch(e){
                    console.error(e);
                    setLoading(true);
                }
            },500);
        }catch(e){
            console.error(e);
        }
    }

    const listChartData = async(list : any) : Promise<void>=>{
        try{
            let korArr : Array<any> = [];
            let engArr : Array<any> = [];
            let mathArr : Array<any> = [];
            let socialArr : Array<any> = [];
            let foreignArr : Array<any> = [];
            let hisotryArr : Array<any> = [];
            let etcArr : Array<any> = [];

            list.map((item : any,index : any)=>{
                const standard = item.standard;
                switch(standard){
                    case "국어": korArr.push(item); break; 
                    case "영어": engArr.push(item); break;
                    case "수학": mathArr.push(item); break;
                    case "사회/과학/직업탐구": socialArr.push(item); break;
                    case "한문/제2외국어": foreignArr.push(item); break;
                    case "한국사": hisotryArr.push(item); break;
                    case "기타": etcArr.push(item); break;
                    default: break;
                }
            });

            setKor(korArr);
            setEng(engArr);
            setMath(mathArr);
            setSocial(socialArr);
            setEng2(foreignArr);
            setKorKor(hisotryArr);
            setEtc(etcArr);
        }catch(e){
            console.error(e);
        }
    }

    const barChartData = async(chart: any) : Promise<void>=>{
        try{
            let i =0;
            let j =0;
            let idx : Array<number> = [0,0,0,0,0,0,0];
            
            while(i<chart.length){
                const cur_date = chart[i].cur_date;
                const percent = +Math.round(chart[i].percent);

                if(thisWeek[j] === cur_date){
                    idx[j] += percent;
                    i++;
                }else{
                    week[j] = idx[j];
                    j++;
                }

                if(i === chart.length){
                    week[j] = idx[j];
                    break;
                }
            }
        }catch(e){
            console.error(e);
        }
    }

    const pieChartData = async(chart : any) : Promise<void>=>{
        try{
            // progress ring 으로 대체하자
        }catch(e){
            console.error(e);
        }
    };

    const scrollEnd = () =>{
        const height = Dimensions.get('window').height;
        scroll.scrollTo({x : 0, y: height});
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

    useEffect(()=>{
        setLoading(true); //true롤 해야함
        update();

    },[]);

    if(loading){
        return(
            <Style.Container>
                <LoadingView url={require("~/Assets/timeLoading.gif")}/>
            </Style.Container>
        )
    }else{
        return(
            <Style.Container>
                <Style.Scroll ref={(scroll) => setScroll(scroll)}>
                    <Style.Header>
                        <Style.TopAbsoluteView>
                            <ArrowButton onPress={()=>navigation.openDrawer()}/>
                            <ScrollTodayButton iconName="checkcircleo" onPress={()=>scrollEnd()}/>
                        </Style.TopAbsoluteView>
                        <TitleLabel title="CHART"/>
                    </Style.Header>
                    <Style.BarChartView>
                        <Style.BarChartTitleLabel>{barChartTitle}</Style.BarChartTitleLabel>
                            <BarChart 
                                    data={{
                                        labels:["월","화","수","목","금","토","일"],
                                        datasets:[
                                            {
                                                data : [week[0],week[1],week[2],week[3],week[4],week[5],week[6]]
                                            }
                                        ]
                                    }}
                                    yAxisLabel=''
                                    yAxisSuffix=''
                                    width={Dimensions.get('window').width-50}
                                    height={220}
                                    withHorizontalLabels={false}
                                    fromZero={true}
                                    chartConfig={{
                                        backgroundColor: '#FAF7F6',
                                        backgroundGradientFrom: "#FAF7F6",
                                        backgroundGradientFromOpacity : 1,
                                        backgroundGradientToOpacity : 1,
                                        backgroundGradientTo : '#FAF7F6',
                                        decimalPlaces: 0,
                                        color : ( opacity = 1) => `rgba(108,129,112,${opacity})`,
                                        labelColor : (opacity = 1) => `rgba(108,129,112,${opacity})`,
                                        
                                        style:{
                                            borderRadius: 16
                                        }
                                    }}
                                    style={{
                                        paddingLeft:0,
                                        paddingRight : 0,
                                        borderRadius: 25,
                                    }}
                                />
                        </Style.BarChartView>
                    <Style.PieChartView>
                        {/* <Style.PieChartTitleLabel>이번주에 많이 한 공부(대분류 - 소분류)</Style.PieChartTitleLabel> */}
                        {/* <PieChart
                            style={{flex : 1}}
                            logEnabled={true}
                            chartBackgroundColor={processColor('pink')}
                            chartDescription={{
                                text: "이번주에 많이 한 공부(대분류 - 소분류)",
                                textSize: 15,
                                textColor: processColor('darkgray')
                            }}
                            data={{
                                dataSets:[{
                                    values:[
                                        {value: 45, label: 'A'},
                                        {value: 30, label: 'B'}
                                    ],
                                    label: 'Pie dataset',
                                    config:{
                                        colors: [processColor('#C0FF8C'), processColor('#FFF78C')],
                                        valueTextSize: 20,
                                        valueTextColor: processColor('green'),
                                        sliceSpace: 5,
                                        selectionShift: 13,
                                        valueFormatter: "#.#'%'",
                                        valueLineColor: processColor('green'),
                                        valueLinePart1Length: 0.5
                                    }
                                }],
                            }}
                            legend={{
                                enabled: true,
                                textSize: 15,
                                form: 'CIRCLE',

                                horizontalAlignment: "RIGHT",
                                verticalAlignment: "CENTER",
                                orientation: "VERTICAL",
                                wordWrapEnabled: true
                            }}
                            highlights={[{x:2}]}
                            
                            entryLabelColor={processColor('green')}
                            entryLabelTextSize={20}
                            drawEntryLabels={true}

                            rotationEnabled={true}
                            rotationAngle={45}
                            usePercentValues={true}
                            centerTextRadiusPercent={100}
                            holeColor={processColor('#f0f0f0')}
                            transparentCircleRadius={45}
                            transparentCircleColor={processColor('#f0f0f088')}
                            maxAngle={350}
                            /> */}
                    </Style.PieChartView>
                    <Style.ChartListView>
                        <StatisticItem subjectTitle="국어" subjectColor={Color.KOREAN} subjectArr={kor} colorArr={Color.KOR_ARR}/>
                        <StatisticItem subjectTitle="영어" subjectColor={Color.ENGLISTH} subjectArr={eng} colorArr={Color.ENG_ARR}/>
                        <StatisticItem subjectTitle="수학" subjectColor={Color.MATH} subjectArr={math} colorArr={Color.MATH_ARR}/>
                        <StatisticItem subjectTitle="사회/과학/직업탐구" subjectColor={Color.SOCIAL} subjectArr={social} colorArr={Color.SOCIAL_ARR}/>
                        <StatisticItem subjectTitle="한문/제2외국어" subjectColor={Color.FOREIGN} subjectArr={eng2} colorArr={Color.FOREIGN_ARR}/>
                        <StatisticItem subjectTitle="한국사" subjectColor={Color.HISTORY} subjectArr={korKor} colorArr={Color.HISTORY_ARR}/>
                        <StatisticItem subjectTitle="기타" subjectColor={Color.ETC} subjectArr={etc} colorArr={Color.ETC_ARR}/>
                    </Style.ChartListView>
                </Style.Scroll>
                {/* <Style.BannerView>
                    <Banner/>
                </Style.BannerView> */}
            </Style.Container>
        )
    }

};

export default Statistic;