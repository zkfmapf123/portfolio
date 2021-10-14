import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Container = st.View`
    background-color : ${Color.TODAY_HEADER_INNER_COLOR};
    flex-direction : row;
    padding : 5px;
    border-radius : 20px;
    margin : 0px 20px;
`

const TimeLabel = st.Text`
    color : white;
    font-size : 12px;
    width : 30%;
    text-align: center;
`;
const TodoLabel = st.Text`
    text-align: center;
    color : white;
    font-size : 12px;
    width : 70%;
    letter-spacing : 1px;
`;

const TodayHeaderView = () =>{
    return(
        <Container>
            <TimeLabel>TIME</TimeLabel>
            <TodoLabel>할일</TodoLabel>
        </Container>
    );
};

export default TodayHeaderView;