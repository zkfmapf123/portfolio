import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Container = st.SafeAreaView`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;
const EmptyContainer = st.View`
    flex :1;
    justify-content : center;
    align-items :center;
`;
const Header = st.View`
    flex :1;
    justify-content : flex-end;
    align-items : center;
    margin-bottom : 50px;
`;

const HeaderTopLabel = st.Text`
    color : ${Color.DRAWER_HEADER_LABEL_COLOR};
    font-family : ${Fonts.light};
    font-size : 15px;
    margin-bottom : 5px;
`;
const HeaderProverLabel = st.Text`
    color : ${Color.DRAWER_HEADER_LABEL_COLOR};
    font-family : ${Fonts.bold};    
    font-size : 20px;
`;

const Main = st.View`
    flex :2;
    justify-content : flex-start;
`;

const MainLabel = st.Text`
    background-color : ${Color.DRAWER_MAIN_INNER_COLOR};
    color : white;
    letter-spacing : 1px;
    padding : 15px;
    font-size : 18px;
    border : 1px solid ${Color.ENTIRE_BACKGROUND_COLOR};
    font-family : ${Fonts.bold};
    width : 80%;
`;

const Footer = st.View`
    flex : 1;
`;

const ToastLabel = st.Text`
    text-align:center;
    font-size : 15px;
    font-family : ${Fonts.medium};
`;

const DrawerColumn = st.View`
    justify-content : center;
    align-items : center;
    margin-bottom : 10px;
`;


export default{
    Container,
    Header,
    HeaderTopLabel,
    HeaderProverLabel,
    Main,
    Footer,
    ToastLabel,
    EmptyContainer,
    MainLabel,
    DrawerColumn,
}

