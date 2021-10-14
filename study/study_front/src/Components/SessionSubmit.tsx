import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Touch = st.TouchableOpacity`
    background-color : ${Color.SESSION_BUTTON_INNER_COLOR};
    width : 200px;
    padding : 20px;
    border-radius : 20px;
    margin-top : 20px;
`;

const Label = st.Text`
    text-align:center
    color : white;
    font-family : ${Fonts.medium};
    letter-spacing : 3px;
`;

interface Props{
    onPress :() => void;
    title : string;
}

const SessionSubmit=({onPress, title} : Props)=>{
    return(
        <Touch onPress={onPress}>
            <Label>{title}</Label>
        </Touch>
    );
};

export default SessionSubmit;