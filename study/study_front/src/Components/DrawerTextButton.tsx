import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

interface Props{
    title : string;
    onPress:()=>void;
}

const TouchButton = st.TouchableOpacity`
    border : 1px solid ${Color.ENTIRE_BACKGROUND_COLOR};
    border-bottom-color : ${Color.DRAWER_BORDER_BOTTOM_COLOR}; 
    width : 80%;
`;
const Label = st.Text`
    font-size : 13px;
    letter-spacing : 2px;
    padding: 8px;
`;

const DrawerTextButton = ({title, onPress}:Props) =>{
    return(
        <TouchButton onPress={onPress}>
            <Label>{title}</Label>
        </TouchButton>
    );
};

export default DrawerTextButton;