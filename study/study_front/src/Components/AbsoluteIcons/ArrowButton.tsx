import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";

const TouchButton = st.TouchableOpacity``;

interface Props{
    onPress :() => void;
}

const ArrowButton = ({onPress}:Props) =>{
    return(
        <TouchButton onPress={onPress}>
            <Icons name="swapright" size={30} color="#CDC8C8"/>
        </TouchButton>
    );
};

export default ArrowButton;