import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";
import RemoveIcons from "react-native-vector-icons/AntDesign";

const Container = st.View`
    flex-direction : row;
    padding : 10px;
    border-radius : 20px;
    margin : 0px 20px;
`

const TimeLabel = st.Text`
    font-size : 15px;
    width : 30%;
    text-align: center;
    color : ${Color.TODAY_TEXT_COLOR};
    font-weight : bold;
`;
const TodoLabel = st.Text`
    text-align: center;
    font-size : 15px;
    width : 60%;
    letter-spacing : 1px;
    color : ${Color.TODAY_TEXT_COLOR};
`;

const TouchButton = st.TouchableOpacity`
    width : 10%
    margin-left : 5px;
`;

interface Props{
    time : string;
    title: string;
    onDelete :() => void;
}

const TodayItem = ({time, title, onDelete} : Props) =>{
    return(
        <Container>
            <TimeLabel numberOfLines={1}>{time.toString().substr(0,2)}:{time.toString().substr(2,4)}</TimeLabel>
            <TodoLabel numberOfLines={1}>{title}</TodoLabel>
            <TouchButton onPress={onDelete}><RemoveIcons name="close" size={15} color={Color.PLAN_TITLE_TEXT_COLRO}/></TouchButton>
        </Container>
    );
};

export default TodayItem;