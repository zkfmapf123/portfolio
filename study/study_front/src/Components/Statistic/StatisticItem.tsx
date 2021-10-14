import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";
import ListView from "../Home/ListView";
import Item from "./Item";

const Container =st.View`
    flex : 1;
    margin : 15px 0px;
`;

const Header= st.TouchableOpacity`
    flex-direction : row;
    align-items: center;
`;
const Main = st.SafeAreaView`
    margin-top : 20px;
`;

const SubejctBox = st.Text`
    width : 20px;
    height: 20px;
    margin-right: 10px;
`;
const SubejctLabel = st.Text`
    font-size :18px;
    font-family : ${Fonts.bold};
    color :${Color.STATISTIC_COMMON_TEXT_COLOR};
`;

const DescriptionLabel = st.Text`
    margin : 10px 0px;
    font-size :15px;
    font-family : ${Fonts.medium};
    text-align: center;
    color : ${Color.STATISTIC_COMMON_TEXT_COLOR};
`;


interface Props{
    subjectTitle : string;
    subjectColor : string;
    subjectArr : any;
    colorArr : any;
}

const StatisticItem = ({subjectTitle,subjectColor, subjectArr, colorArr} : Props) =>{
    const [timeTotal , setTimeTotal] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(false);

    const showStudyList = () =>{
        let time : number = 0;
        subjectArr.map((item : any)=>{
            time +=item.study_time;
        });
        setTimeTotal(time);
        setTimeout(()=>{
            setToggle(!toggle);
        },2000);
    }
    
    if(subjectArr.length === 0){
        return(
            <Container>
                <Header>
                    <SubejctBox style={{backgroundColor : `${subjectColor}`}}/>
                    <SubejctLabel>{subjectTitle}</SubejctLabel>
                </Header>
                <Main>
                    <DescriptionLabel>공부한 내용이 없습니다</DescriptionLabel>
                </Main>
            </Container>
        )
    }else{
        return(
            <Container>
                <Header onPress={()=>showStudyList()}>
                    <SubejctBox style={{backgroundColor : `${subjectColor}`}}/>
                    <SubejctLabel>{subjectTitle}</SubejctLabel>
                </Header>
                <Main>
                {
                    toggle &&
                        subjectArr.map((item : any, index : number)=>{
                            const todo = item.todo;
                            let studyTimeRatio : any;
                            if(item.study_time ===0 && timeTotal === 0) studyTimeRatio = 0;
                            else studyTimeRatio = (item.study_time / timeTotal).toFixed(2);

                            const idx = index % 4;
                    
                            return(
                                <Item 
                                    key={index}
                                    itemColor={colorArr[idx]}
                                    itemTitle={todo}
                                    itemRatio={studyTimeRatio}/>
                            )
                        })
                }
                </Main>
            </Container>
        )
    }
};

export default StatisticItem;