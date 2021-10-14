import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";
import { Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

const Container = st.SafeAreaView`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
    margin-bottom : 10px;
`;

const StudyListMainLabel = st.Text`
color : ${Color.MAIN_TODAY_STRING_COLOR};
text-align: center;
font-family : ${Fonts.bold};
font-size : 18px;
letter-spacing : 1px;
margin : 15px 0px;
`;

const TopAbsolutView = st.View`
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


const ScrollColumn = st.ScrollView`
    flex : 1;
    border-radius : 20px;
    margin : 20px;
    padding : 10px 0px;
`;

const Header = st.View`
    justify-content :center;
    align-items : center;
    background-color :${Color.ENTIRE_BOX_INNER_COLOR};
    padding-top : 30px;
    padding : 0px 20px;
`;

const HeaderDayTitleLabel = st.Text`
    font-family : ${Fonts.medium}
    font-size :18px;
    color : white;
    margin-top : 20px;
    margin-bottom : 10px;
`;
const HeaderLabel = st.Text`
    font-family : ${Fonts.medium}
    font-size : 15px;
    color : white;
    letter-spacing: 5px;
    margin-bottom : 10px;
`;
const TimeLabel = st.Text`
    font-family : ${Fonts.bold}
    font-size : 35px;
    letter-spacing : 10px;
    color :white;
    margin-bottom : 20px;
`;

const HeaderButtonView = st.View`
    flex-direction : row;
    justify-content : space-around;
    align-items: center;
`;
const Main = st.View`
    flex : 3;
`;

const FooterTouchButtonView = st.View`
    justify-content :flex-end;
    align-items : center;
`;

const BannerFooterView = st.View`
    justify-content : center;
    align-items: center;
`;

const BannerFooterLabel = st.Text`
`;

export default {
    Container,
    StudyListMainLabel,
    Header,
    TopAbsolutView,
    Main,
    BannerFooterView,
    HeaderDayTitleLabel,
    HeaderButtonView,
    HeaderLabel,
    TimeLabel,
    FooterTouchButtonView,
    BannerFooterLabel,
    ScrollColumn,
}