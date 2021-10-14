import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Container = st.View`
    flex : 1;
    margin-top : 100px;
`;

const Label = st.Text`
    text-align :center;
    font-size : 15px;
    font-family : ${Fonts.bold};
    color : ${Color.CAL_TITLE_TEXT_COLOR};
    letter-spacing : 1px;
`;

interface Props{
    description : string;
}

const TimeCheckListView = ({description} : Props)=>{
    return(
        <Container>
            <Label>{description}</Label>
        </Container>
    );
};

export default TimeCheckListView;
