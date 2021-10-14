import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const UserBodyView = st.View`
  flex : 1;
  margin : 0 10px;
`;

const HeaderColumn = st.View`
  flex : 1;
`;
const BodyColumn = st.View``;

const TouchButton = st.TouchableOpacity``;

const Label = st.Text`
  border :1px solid ${COLOR.FOCUESED_COLOR};
  border-radius : 20px;
  padding : 5px 15px;
  color : ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.nexonRegular};
  margin : auto 5px;
`;

const RecentlyLabel = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
  font-family: ${FONTS.nexonMedium};
  font-size : 15px;
  font-weight: bold;
  margin : 15px 0px 15px 30px;
`;


export default {
  HeaderColumn,
  UserBodyView,
  BodyColumn,
  TouchButton,
  Label,
  RecentlyLabel
};
