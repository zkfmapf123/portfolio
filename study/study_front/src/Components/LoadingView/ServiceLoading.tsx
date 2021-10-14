import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";
import ServiceTouchButton from "./ServiceTouchButton";

const Container = st.View`
    flex: 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;

const Header =st.View`
    flex : 1;
    justify-content :flex-end;
    align-items: center;
`;

const Main = st.View`
    justify-content : center;
    align-items : center;
`;

const Footer = st.View`
    flex : 1;
    justify-content : flex-start;
    align-items: center;
`;
const Images = st.Image``;

const HeaderMainLabel = st.Text`    
    font-size :25px;
    font-family :${Fonts.service};
    text-align: center;
    color : ${Color.SERVICE_MAIN_LABEL_COLOR};
    margin-bottom : 10px;
`;
const HeaderFooterLabel = st.Text`
    font-size : 15px;
    font-family :${Fonts.medium};
    text-align: center;
    color : ${Color.SERVICE_FOOTER_LABEL_COLOR};
    margin-bottom : 2px;
`;

interface Props{
    title : string;
    onBackPress:()=>void;
    onBannerPress:()=>void;
}

const ServiceLoading = ({title, onBackPress, onBannerPress}: Props) =>{
    return(
        <Container>
            <Header>
                <HeaderMainLabel>서비스 준비중 입니다</HeaderMainLabel>
                <HeaderFooterLabel>보다 나은 사용을 위해 {title} 기능을</HeaderFooterLabel>
                <HeaderFooterLabel>준비하고 있습니다</HeaderFooterLabel>
            </Header>
            <Main>
                <Images source={require("~/Assets/service.png")}/>
            </Main>
            <Footer>
                <ServiceTouchButton onBackPress={onBackPress} onBannerPress={onBannerPress}/>
            </Footer>
        </Container>
    );
};

export default ServiceLoading;