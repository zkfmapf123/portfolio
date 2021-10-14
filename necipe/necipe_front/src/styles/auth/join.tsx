import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Header = st.View`
  flex : 1;
  justify-content : flex-end;
  align-items: center;
`;

const HeaderTitleLabel = st.Text`
  font-size : 30px;
  font-weight : bold;
  color : ${COLOR.FONT_COLOR};
  letter-spacing : 2px;
`;

const Main = st.View`
  flex: 1;

  justify-content : center;
  align-items : center;
`;

const Footer = st.View`
  flex : 1;
`;

export default {
  Header,
  HeaderTitleLabel,
  
  Main,

  Footer,
}