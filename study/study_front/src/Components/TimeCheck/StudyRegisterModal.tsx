import React, { useCallback, useEffect, useState } from "react";
import st from "styled-components/native";
import ArrayList from "~/Library/Dictionary/ArrayCircularList";
import Icons from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { Fonts } from "~/Library/Fonts";
import { Color } from "~/Library/Color";
import DialogBox from "../DialogBox";
import Day from "~/Library/Day";
import AsyncStorage from "@react-native-community/async-storage";
import { SERVER_API } from "~/Library/Const";
import { useFocusEffect } from "@react-navigation/core";
import { Alert, BackHandler } from "react-native";

const Container = st.View`
    width :300px;
    height: 200px;
    background-color : white;
    border-radius : 25px;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    padding-top : 5px;
    padding-right : 5px;
    padding-left : 5px;
`;

const Header = st.View`
    height: 50px;
    justify-content : center;
    align-items: center;
`;

const HeaderLabel = st.Text`
    text-align: center;
    font-family : ${Fonts.bold};
    font-size : 18px;
    color : ${Color.TODAY_TEXT_COLOR};
`;

const Main = st.View`
    height: 150px;
    justify-content : center;
    align-items: center;
`;

const MainTopColumn =st.View`
    height : 100px;
    flex-direction : row;
    justify-content : center;
    align-items: center;
`;
const MainBottomColumn = st.View`
    height: 50px;
    flex-direction : row;
    margin-bottom : 15px;
`;

const TitleTouchButton = st.TouchableOpacity`
    margin : 0px 10px;
`;
const TitleTouchLabel = st.Text`
    font-size : 15px;
    padding : 10px;
    background-color : ${Color.Time_Del_Button};
    color : white;
    font-family : ${Fonts.medium};
    border-radius : 25px;
`;

const TouchButton = st.TouchableOpacity`
    margin : 0px 25px;
`;
const ButtonLabel = st.Text`
    font-size : 15px;
    padding: 10px;
    text-align: center;
    font-family : ${Fonts.bold};
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    border : 1px solid ${Color.TIME_START_BUTTON_BORDER_RADIUS_COLOR};
    color : ${Color.TODAY_TEXT_COLOR};
    border-radius : 25px;
`;

const InputText = st.TextInput`
    width : 80%;
    border: 1px solid ${Color.ENTIRE_BACKGROUND_COLOR};
    border-bottom-color : ${Color.INPUTTEXT_BOTTOM_COLOR};
    padding-bottom : 4px;
`;

interface Props{
    onPress :() => void;
}

const StudyRegisterModal = ({onPress} : Props) =>{
    const [step, setStep] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    
    const [description , setDescription] = useState<string>("?????? ????????? 2~10?????? ?????? ?????????");
    const [serverDay, setServerDay] = useState<string>(`${Day.CURRENT_YEAR}${Day.ZERO_CURRENT_MONTH}${Day.ZERO_CURRENT_DATE}`)
    let [selectIndex, setSelectIndex] = useState<number>(0);
    const [headerLabel, setHeaderLabel] = useState<string>("?????? ?????????");
    const [subject, setSubejct] = useState<string>("");
    
    const [todo ,setTodo] = useState<string>("");

    const pressButton = (title : string) : void =>{
        setSubejct(title);
        setHeaderLabel(title);
        setStep(true);
    }

    const registerStudy = async() : Promise<void> =>{
        if(todo.length < 2){
            setDialog(true);
        }else{
            const userId = await AsyncStorage.getItem("userId");
            try{
                const setting = {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: `${userId}`,
                        cur_date : `${serverDay}`,
                        todo: `${todo}`,
                        standard: `${subject}`
                    })
                };

                const response = await fetch(`${SERVER_API}/study/register`,setting);
                if(response.status === 200){
                    setDescription("????????? ?????????????????????. ??????????????? ???????????????");
                    setDialog(true);
                    setSubmit(true);
                }
            }catch(e){
                console.error(e);
            }
        }
    };

    return(
        <Container>
            {
                dialog && <DialogBox title="Timer" descriptoin={description} onPress={()=>setDialog(false)}/>
            }
            <Header>
                <HeaderLabel numberOfLines={1}>{headerLabel}</HeaderLabel>
            </Header>
            {
                !step?
                (<Main>
                    <MainTopColumn>
                        <ScrollView
                            horizontal={true}>
                            <TitleTouchButton onPress={()=>pressButton("??????")}>
                                <TitleTouchLabel>??????</TitleTouchLabel>
                            </TitleTouchButton>
                            <TitleTouchButton onPress={()=>pressButton("??????")}>
                                <TitleTouchLabel>??????</TitleTouchLabel>
                            </TitleTouchButton>
                            <TitleTouchButton onPress={()=>pressButton("??????")}>
                                <TitleTouchLabel>??????</TitleTouchLabel>
                            </TitleTouchButton>
                            <TitleTouchButton onPress={()=>pressButton("??????/??????/????????????")}>
                                <TitleTouchLabel>??????/??????/????????????</TitleTouchLabel>
                            </TitleTouchButton>
                            <TitleTouchButton onPress={()=>pressButton("?????????")}>
                                <TitleTouchLabel>?????????</TitleTouchLabel>
                            </TitleTouchButton>
                            <TitleTouchButton onPress={()=>pressButton("??????/???2?????????")}>
                                <TitleTouchLabel>??????/???2?????????</TitleTouchLabel>
                            </TitleTouchButton>
                            <TitleTouchButton onPress={()=>pressButton("??????")}>
                                <TitleTouchLabel>??????</TitleTouchLabel>
                            </TitleTouchButton>
                        </ScrollView>
                    </MainTopColumn>
                    <MainBottomColumn>
                        <TouchButton onPress={onPress}>
                            <ButtonLabel>?????????</ButtonLabel>
                        </TouchButton>
                    </MainBottomColumn>
                </Main>)
                :
                (<Main>
                    <MainTopColumn>
                        <InputText 
                                  textAlign="center"
                                  placeholder="?????? ????????? ?????????????"
                                  onChangeText={text => setTodo(text)}
                                  keyboardType="twitter"
                                  style={{fontWeight:"bold"}}
                                  value={todo}/>
                    </MainTopColumn>
                        {
                            !submit ? 
                            (<MainBottomColumn>
                                <TouchButton onPress={()=>registerStudy()}>
                                    <ButtonLabel>????????????</ButtonLabel>
                                </TouchButton>
                                <TouchButton onPress={onPress}>
                                    <ButtonLabel>?????????</ButtonLabel>
                                </TouchButton>
                            </MainBottomColumn>)
                            :
                            (<MainBottomColumn>
                                <TouchButton onPress={onPress}>
                                    <ButtonLabel>?????????</ButtonLabel>
                                </TouchButton>
                            </MainBottomColumn>)
                        }
                </Main>)
            }
        </Container>
    );
};

export default StudyRegisterModal;