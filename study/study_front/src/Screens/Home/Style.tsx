import { Dimensions } from "react-native";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const width = Dimensions.get('window').width;

// padding-top : 30px;
// padding-left : 20px;
// padding-right : 20px;

const Container = st.SafeAreaView`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;

const BannerView = st.View`
    justify-content : center;
    align-items: center;
`;

const BannerLabel = st.Text``;

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
    background-color : ${Color.ENTIRE_BOX_INNER_COLOR};
    padding-top : 30px;
    padding-left :20px;
    padding-right: 20px;
    justify-content :center;
    align-items: center;
    margin-bottom : 5px;
`;


const MiddleColum = st.View`
justify-content :center;
align-items :center;
`;

const Main = st.View`
    flex : 1;
    justify-content :center;
    align-items :center;
    border: 1px solid ${Color.PLAN_MAIN_BORDER_COLOR};
    border-radius : 20px;
    padding : 20px;
    margin: 0px 20px;
`;


const MainLabel = st.Text`
    color : ${Color.MAIN_TODAY_STRING_COLOR};
    padding : 15px;
    width : 60%;
    text-align: center;
    font-family : ${Fonts.bold};
    font-size : 18px;
    letter-spacing : 1px;
    border-radius : 15px;
    margin : 10px 0px;
`;

const TodoListHeaderView =st.View`
    justify-content :center;
    align-items: center;
    padding : 15px 0px;
`;

const MainRatioLabel =st.Text`
    font-size: 15px;
    color : ${Color.TODAY_TEXT_COLOR};
    border: 1px solid ${Color.MAIN_RATIO_LABEL_BORDER_OUTER_COLOR};
    padding : 5px;
    border-radius : 20px;
    text-align: center;
    width : 70%;
`;

const InputTextView =st.View`
    flex-direction :row;
    justify-content : center;
    align-items: center;
    padding : 15px 0px;
`;

const InputTextTimeLabel = st.Text`
    color : ${Color.TODAY_TEXT_COLOR};
    font-family :${Fonts.medium};
    font-size : 12px;
    width : 50px;
    text-align: center;
`;

const TextInput =st.TextInput`
    width : 70%;
    border: 1px solid ${Color.ENTIRE_BACKGROUND_COLOR};
    border-bottom-color : ${Color.INPUTTEXT_BOTTOM_COLOR};
    padding-bottom : 8px;
`;

const SpaceViwe = st.View`
    height: 20px;
`;


const ToucuButton = st.TouchableOpacity``;

const Footer = st.View`

`;

const TodayTouchButton = st.TouchableOpacity`
    padding : 15px; 0px;
    justify-content :center;
    align-items: center;
`;



export default {
    Container,
    Header,
    TopAbsoluteView,
    Main,
    Footer,
    MainLabel,
    MiddleColum,
    MainRatioLabel,
    InputTextView,
    TextInput,
    ToucuButton,
    TodoListHeaderView,
    SpaceViwe,
    TodayTouchButton,
    BannerView,
    BannerLabel,
    InputTextTimeLabel,
}
