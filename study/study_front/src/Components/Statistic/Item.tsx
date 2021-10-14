import React from "react";
import st from "styled-components/native";
import * as Progress from "react-native-progress";
import { Fonts } from "~/Library/Fonts";
import { Color } from "~/Library/Color";

const Container = st.View`
    flex :1;
    flex-direction : row;
    justify-content : space-around;
    align-items : center;
    margin : 3px 0px;
`;

const TitleView = st.View`
    flex-direction : row;
`;

const Box = st.Text`
    width : 15px;
    height: 15px;
    margin-right: 10px;
`;

const RatioLabel = st.Text`
    width : 70px;
    
    font-size : 15px;
    font-family: ${Fonts.medium};
    color : ${Color.STATISTIC_COMMON_TEXT_COLOR};
`;

const TitleLabel = st.Text`
    width : 80px;

    font-size : 15px;
    font-family : ${Fonts.medium};
    color : ${Color.STATISTIC_COMMON_TEXT_COLOR};
`;



interface Props{
    itemColor : string;
    itemTitle : string;
    itemRatio : any;
}

const Item = ({itemColor, itemTitle, itemRatio} : Props) =>{
    return(
        <Container>
            <Box style={{backgroundColor:`${itemColor}`}}/>
            <TitleView>
                <TitleLabel numberOfLines={1}>{itemTitle}</TitleLabel>
                <RatioLabel numberOfLines={1}>({itemRatio * 100}%)</RatioLabel>
            </TitleView>
            <Progress.Bar
                progress={+itemRatio}
                width={150}
                height={20}
                color={`${itemColor}`}
                borderColor={"#F2EDED"}
                animationType="timing"/>
        </Container>
    );
};

export default Item;