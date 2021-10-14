import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";
import TimeFormat from "~/Screens/TimeCheck/TimeFormatting";

const Container = st.View`
    flex-direction : row;
    margin : 5px 10px;
`;

const IndexLabel = st.Text`
    flex :1;
    color : ${Color.TODAY_TEXT_COLOR};
    text-align:center;
    font-size : 15px;
    width : 50px;
    font-family : ${Fonts.medium};
    margin-right : 10px;
`;
const TitleLabel = st.Text`
    flex : 3;
    color : ${Color.TODAY_TEXT_COLOR};
    text-align: center;
    font-size : 15px;
    font-family : ${Fonts.medium};
`;
const TimeLabel = st.Text`
    flex :4;
    color : ${Color.TODAY_TEXT_COLOR};
    text-align:center;
    font-size : 15px;
    font-family : ${Fonts.medium};
`;
const TouchButton = st.TouchableOpacity`
    flex :1;
    flex-direction : row;
    justify-content : center;
    align-items : center;
`;

const StandardLabel = st.Text`
    flex :1;
    text-align: center;
    color : ${Color.TODAY_TEXT_COLOR};
    background-color : ${Color.Time_Del_Button};
    color : ${Color.TIME_DEL_BUTTON_TEXT_COLOR};
    padding-top : 5px;
    padding-bottom : 4px;
    border-radius : 20px;
    font-size : 16px;
    font-family : ${Fonts.bold};
`;

const IconTouchButton = st.TouchableOpacity`
    width : 50px;
    justify-content : center;
    align-items: center;
`;

interface Props{
    index : string | number;
    id : string | number;
    standard : string;
    todo : string;
    study_time : string;
    onPressDelete :() => void;
    onPressTimes:() => void;
}

const TimeItem = ({index, id, standard, todo, study_time, onPressDelete, onPressTimes} : Props) =>{

    return(
        <Container>
            <TouchButton onPress={onPressTimes}>
                <IndexLabel numberOfLines={1}>{index}</IndexLabel>
                <TitleLabel numberOfLines={1}>{todo}</TitleLabel>
                <TimeLabel numberOfLines={1}>{TimeFormat.numberToStringTime(+study_time)}</TimeLabel>
                <StandardLabel numberOfLines={1}>{standard.substring(0,1)}</StandardLabel>
            </TouchButton>
            <IconTouchButton onPress={onPressDelete}>
                <Icons name="delete" size={20} color={Color.CAL_TITLE_TEXT_COLOR}/>
            </IconTouchButton>
        </Container>
    )
};

export default TimeItem;