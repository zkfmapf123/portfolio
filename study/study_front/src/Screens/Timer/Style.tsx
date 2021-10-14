import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Container = st.SafeAreaView`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    padding : 200px 10px;
`;
const Header = st.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`;
const Main = st.View`
    flex : 2;
    justify-content : center;
    align-items : center;
`;
const Footer = st.View`
    flex : 1;
    justify-content : space-around;
    align-items : center;
    flex-direction : row;
`;

const MainTodoLabel = st.Text`
    margin-bottom : 10px;
    font-size : 20px;
    color : ${Color.CAL_TITLE_TEXT_COLOR};
    font-family : ${Fonts.medium};
    border-radius : 20px;
    padding : 10px;
`;
const MainTimeWatchLabel = st.Text`
    font-size : 50px;
    color : ${Color.CAL_TITLE_TEXT_COLOR};
    font-family : ${Fonts.bold}

    border: 1px solid ${Color.TODAY_TEXT_COLOR};
    padding : 20px;
    border-radius : 25px;
`;

const TouchButton = st.TouchableOpacity``;
const ButtonLabel = st.Text`
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    color : ${Color.TODAY_TEXT_COLOR};
    font-size : 14px;
    font-family : ${Fonts.medium};
    text-align : center;
    border : 1px solid #CCC2BFCC;
    padding: 10px;
    border-radius : 25px;
`;
const ExitLabel = st.Text`
    background-color : #CCC2BF;
    color : ${Color.TODAY_TEXT_COLOR};
    font-size : 14px;
    font-family : ${Fonts.medium};
    text-align : center;
    border : 1px solid #CCC2BFCC;
    padding: 10px;
    border-radius : 25px;
`;

const TitleLabel = st.Text`
    font-size : 25px;
    font-family: ${Fonts.bold};
    border-radius : 15px;
    letter-spacing : 2px;
    text-align :center;
    color : ${Color.TODAY_TEXT_COLOR};
    margin-bottom : 10px;

    background-color : ${Color.ENTIRE_BOX_INNER_COLOR};
    border-radius : 20px;
    padding : 10px;
`;


export default {
    Container,
    TitleLabel,
    Header,
    Main,
    Footer,
    TouchButton,
    ButtonLabel, 
    ExitLabel,
    MainTodoLabel,
    MainTimeWatchLabel,
};

