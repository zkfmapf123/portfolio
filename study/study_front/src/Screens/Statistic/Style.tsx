import { Dimensions } from "react-native";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const width = Dimensions.get('window').width;
const Container = st.SafeAreaView`
    flex  :1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;

const Scroll = st.ScrollView`
    flex : 1;
`;

const TopAbsoluteView = st.View`
    width : ${width}px;
    flex-direction : row;
    justify-content : space-between;
    align-items: center;
    position : absolute;
    top : 0;
    right : 0;
    margin-top : 10px;
    padding : 0 15px;
`;


const Header = st.View`
    justify-content : center;
    align-items: center;
    background-color : ${Color.ENTIRE_BOX_INNER_COLOR};
    padding-top:20px;
    padding-left: 20px;
    padding-right: 20px;
`;

const BarChartTitleLabel = st.Text`
    text-align: center;
    font-family : ${Fonts.bold};
    color : white;
    font-size : 13px;
    margin-top : 30px;
    margin-bottom : 15px;
`;

const PieChartTitleLabel = st.Text`
    text-align: center;
    font-family : ${Fonts.bold};
    color : ${Color.CAL_TITLE_TEXT_COLOR};
    font-size : 15px;
    margin-top : 30px;
    margin-bottom : 15px;
`;

const BannerView = st.View`
    justify-content : center;
    align-items: center;
`;

const BannerLabel = st.Text``;


const BarChartView = st.View`
    background-color : ${Color.ENTIRE_BOX_INNER_COLOR};
    padding : 0px 20px;
    padding-bottom : 30px;
`;
const PieChartView = st.View`
    height : 30px;
    padding : 0px 20px;
`;
const ChartListView =st.View`
    padding : 0px 20px;
`;


export default {
    Container,
    Scroll,
    TopAbsoluteView,
    Header  ,
    BarChartView,
    PieChartView,
    ChartListView,
    BarChartTitleLabel,
    PieChartTitleLabel,
    BannerView,
    BannerLabel,
}