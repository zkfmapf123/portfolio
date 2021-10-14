import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Container = st.SafeAreaView`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    padding : 10px 10px;
`;

const Header = st.View`
    height: 180px;
    justify-content : space-around;
    align-items : center;
`;

const HeaderH = st.Text`
    font-size : 15px;
    font-family : ${Fonts.bold};
    color: white;
    padding : 4px 7px 4px 7px;
    border-radius : 20px;
    text-align : center;
`;
const HeaderLabel = st.Text`
    letter-spacing : 5px;
    color : ${Color.TODAY_TEXT_COLOR};
    width : 250px;
    text-align :center;
    padding : 8px 0px;
    font-size : 30px;
    border-radius : 20px;
    font-weight: bold;
    font-family : ${Fonts.bold};
`;

const Main = st.View`
    flex : 1;
`;
const Column = st.View`
    flex : 1;
    justify-content :center;
    align-items : center;
`;

const ColumnTitleLabel = st.Text`
    color : ${Color.TODAY_TEXT_COLOR};
    font-family : ${Fonts.bold};
    font-size : 18px;
    letter-spacing : 2px;
    margin-bottom : 10px;
`;
const ColumnDateLabel = st.Text`
    color : ${Color.TODAY_TEXT_COLOR};
    font-family : ${Fonts.medium};
    font-size :13px;
    margin-bottom : 10px;
`;
const TimeTopLabel = st.Text`
    color : ${Color.TODAY_TEXT_COLOR};
    font-size : 18px;
    font-family : ${Fonts.medium};
    margin-bottom : 10px;
`;
const TimeMidLabel = st.Text`
    font-size : 25px;
    font-family : ${Fonts.bold};
    color : ${Color.TODAY_TEXT_COLOR};
`;
const ResultLabel = st.Text``;

const BannerView = st.View`
    height : 100px;
    border: 1px solid black;
    justify-content : center;
    align-items: center;
`;
const BannerLabel = st.Text``;

const MyTimeView = st.View`
    border: 1px solid ${Color.TODAY_TEXT_COLOR};
    border-radius : 25px;
    width : 70%;
    padding : 10px;

    justify-content : center;
    align-items: center;
    margin-bottom : 10px;
`;


export default {
    Container,
    Header,
    Main,
    Column,
    BannerView,
    BannerLabel,
    HeaderLabel,
    HeaderH,
    ColumnTitleLabel,
    ColumnDateLabel,
    TimeTopLabel,
    TimeMidLabel,
    ResultLabel,
    MyTimeView,
};


