import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Header = st.View`
  flex : 2;
  justify-content : flex-end;
  align-items: center;
`;

const HeaderTitleLabel = st.Text`
  font-size : 30px;
  font-weight : bold;
  color : ${COLOR.FONT_COLOR};
  font-family : ${FONTS.bingleBold};
`;

const EmptyView = st.View`
  flex : 1;
`;

const Main = st.View`
  flex : 2;
  justify-content : flex-start;
  align-items: center;
`;

export default {
  Header,
  HeaderTitleLabel,
  Main,
  
  EmptyView
}