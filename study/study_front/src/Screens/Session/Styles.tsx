import st from "styled-components/native";
import { Color } from "~/Library/Color";
import {Fonts} from "~/Library/Fonts";

const Container = st.SafeAreaView`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    color : ${Color.SESSION_TITLE_TEXT_COLOR};
`;

const Main = st.View`
    flex  :1;
    justify-content : center;
    align-items : center;
`;

const SessionTitleLabel = st.Text`
    font-size : 30px;
    font-family : ${Fonts.bold};
    margin-bottom : 50px;
    color : ${Color.SESSION_TITLE_TEXT_COLOR};
`;

const IconsView = st.View`
    flex-direction : row;
    justify-content : center;
    align-items :center;
`;
const SmallLabel = st.Text`
    font-size : 10px;
    font-family : ${Fonts.light};
    margin-left : 10px;
`;

const InputText = st.TextInput`
    padding : 15px;
    border: 1px solid ${Color.SESSOIN_INPUTTEXT_BORDER_OUTER};
    border-radius : 20px;
    width : 200px;
    margin-bottom : 20px;
`;

export default{
    Container,
    Main,
    SessionTitleLabel,
    InputText,
    SmallLabel,
    IconsView
};

