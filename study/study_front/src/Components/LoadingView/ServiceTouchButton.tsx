import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

interface Props{
    onBackPress:() => void;
    onBannerPress:()=>void;
}

const Container = st.View``;
const TouchButton = st.TouchableOpacity`
    background-color : ${Color.ENTIRE_BOX_INNER_COLOR};
    border-radius : 25px;
    padding: 20px;
    margin-bottom : 10px;
`;
const TouchButtonLabel = st.Text`
    font-size : 15px;
    color : white;
    font-family : ${Fonts.medium};
    text-align: center;
`;

const ServiceTouchButton = ({onBackPress, onBannerPress}: Props) =>{
    return(
        <Container>
            <TouchButton onPress={onBannerPress}>
                <TouchButtonLabel>열일하는 개미를 위해 리뷰쓰기</TouchButtonLabel>
            </TouchButton>
            {/* <TouchButton onPress={onBannerPress}>
                <TouchButtonLabel>열일하는 개미를 위해 리뷰쓰기</TouchButtonLabel>
            </TouchButton> */}
            <TouchButton onPress={onBackPress}>
                <TouchButtonLabel>뒤로가기</TouchButtonLabel>
            </TouchButton>
        </Container>
    );
};

export default ServiceTouchButton;