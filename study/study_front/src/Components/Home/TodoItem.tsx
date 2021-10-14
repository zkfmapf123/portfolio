import React from "react";
import st from "styled-components/native";
import CheckIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RemoveIcons from "react-native-vector-icons/AntDesign";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

interface Props{
    check : boolean;
    title : string;
    onDelete:()=>void;
    onCheck:()=>void;
}

const Container = st.View`
    flex-direction : row;
    justify-content : center;
    align-items: center;
    padding : 15px; 0px;
    border: 1px solid ${Color.ENTIRE_BACKGROUND_COLOR};
    border-bottom-color : ${Color.TODAY_TEXT_COLOR};
    margin : 0 20px;
`;

const TitleLabel = st.Text`
    flex :1;
    font-size :14px;
    text-align: center;
    color : ${Color.TODAY_TEXT_COLOR};
    
`;
const TouchButton = st.TouchableOpacity`
    margin : 0 5px;
`;

const TodoItem = ({check,title,onDelete,onCheck}: Props)=>{
    return(
        <Container>
            {
                check ?
                (<TouchButton onPress={onCheck}><CheckIcons name="checkbox-blank-circle-outline" size={20} color={Color.PLAN_TITLE_TEXT_COLRO}/></TouchButton>)
                :
                (<TouchButton onPress={onCheck}><CheckIcons name="checkbox-blank-circle" size={20} color={Color.PLAN_TITLE_TEXT_COLRO}/></TouchButton>)
            }
            <TitleLabel numberOfLines={1}>{title}</TitleLabel>
            <TouchButton onPress={onDelete}><RemoveIcons name="close" size={15} color={Color.PLAN_TITLE_TEXT_COLRO}/></TouchButton>
        </Container>
    )
};

export default TodoItem;