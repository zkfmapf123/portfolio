import React from "react";
import st from "styled-components/native";
import { Fonts } from "~/Library/Fonts";

const TouchButton = st.TouchableOpacity`
    margin-bottom : 20px;
    margin-left : 10px;
    margin-right :10px;
`;

const Label = st.Text`
text-align: center;
width : 100px;
padding : 10px;
border-radius: 20px;    
border : 1px solid #CCC2BFCC;
font-family : ${Fonts.medium};
`;

interface Props{
    title : string;
    backColor : string;
    textColor : string;
    onPress :() => void;
}

const TimeTouchButton = ({title, backColor, textColor, onPress}: Props) =>{
    return(
        <TouchButton onPress={onPress}>
            <Label style={{backgroundColor:backColor, color:textColor}}>{title}</Label>
        </TouchButton>
    );
};

export default TimeTouchButton;