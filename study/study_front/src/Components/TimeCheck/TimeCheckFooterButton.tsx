import React from "react";
import st from "styled-components/native";
import { Fonts } from "~/Library/Fonts";

const TouchButton = st.TouchableOpacity``;
const Label = st.Text`
    text-align: center;
    width : 220px;
    border: 1px solid #CCC2BFCC;
    margin-top : 20px;
    padding : 15px;
    border-radius : 20px;
    font-family : ${Fonts.medium};
    font-size : 17px;
`;

interface Props{
    title : string;
    textColor : string;
    backColor : string;
    onPress:()=>void;
}

const TimeCheckFooterButton  =({title, textColor, backColor, onPress} : Props) =>{

    return(
        <TouchButton onPress={onPress}>
            <Label style={{backgroundColor : backColor, color : textColor}}>{title}</Label>
        </TouchButton>
    ); 
};

export default TimeCheckFooterButton;