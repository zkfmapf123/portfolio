import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";

const TouchButton = st.TouchableOpacity``;

interface Props{
    iconName : string;
    onPress : () => void;
}

const ScrollTodayButton = ({iconName, onPress}:Props) =>{
    return(
        <TouchButton onPress={onPress}>
            <Icons name={iconName} size={20} color="#CDC8C8"/>
        </TouchButton>
    );
};

export default ScrollTodayButton;