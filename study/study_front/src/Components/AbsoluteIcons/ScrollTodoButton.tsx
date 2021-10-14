import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";

const TouchButton = st.TouchableOpacity`
    position : absolute;
    top : 0;
    right : 0;
    margin-right: 50px;
`;

interface Props{
    onPress : () => void;
}

const ScrollTodoButton = ({onPress}:Props) =>{
    return(
        <TouchButton onPress={onPress}>
            <Icons name="table" size={30} color="#CDC8C8"/>
        </TouchButton>
    );
};

export default ScrollTodoButton;