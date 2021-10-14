import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_WIDTH } from "~/Utils/common/common";
import { FONTS } from "~/Utils/common/fonts";

const HeaderLabel = st.Text``;
const Body = st.ScrollView`
  margin : 0px 30px;
`;

const BodyImageTouchButton = st.TouchableOpacity`
  width : ${DEVISE_WIDTH - 100}px;
  height : 150px;
  margin : 5px auto;
  background-color : ${COLOR.CREATE_RECIPES_BODER_INNER_COLOR};
  border: 1px solid ${COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR};
  border-radius : 20px;
`;

const BodyCookTitleView = st.View`
  margin : 10px 0px;
`;
const BodyCookSearchView = st.SafeAreaView`
  margin : 10px 0px;
`;

const BodyThumnailView = st.View`
  margin : 10px 0px;
`;

const BodyTopLabel = st.Text`
  width : 80px;
  margin : auto 0px;
  color: ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.bingleBold};
  font-size : 15px;
`;

const BodyInputText = st.TextInput`
  margin : 5px 0px;
  border: 1px solid ${COLOR.CREATE_INPUT_TEXT_BORDER_OUTER_COLOR};
  background-color: ${COLOR.CREATE_INPUT_TEXT_BORDER_INNTER_COLOR};
  border-radius : 20px;
  height : 40px;
  font-size : 12px;
  padding : 0px 15px;
  width : 100px;
`;

const BodyImageTouchButtonLabel = st.Text`
  font-size : 12px;
  color : ${COLOR.CREATE_RECIEPS_THUMNAIL_INNER_LABEL_COLOR};
  margin : auto;  
`;

const BodyOptionColumn = st.View`

`;

export default {
  Body,
  HeaderLabel,
  BodyTopLabel,
  BodyCookTitleView,
  BodyThumnailView,
  BodyCookSearchView,
  BodyImageTouchButton,
  BodyImageTouchButtonLabel,
  BodyOptionColumn,
  BodyInputText
};
