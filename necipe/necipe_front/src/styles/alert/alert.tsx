import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Header = st.View`
  height : 130px;
`;

const HeaderBottomColumn = st.View`
  flex : 1;
  flex-direction : row;
  align-items: flex-end;
`;

const HeaderMoveLabelColumn = st.View`
  flex : 1;
  flex-direction : row;
  justify-content : space-around;
  margin : 0 50px;
`;

const Main = st.View`
  flex: 1;
`;

export default {
  Header,
  HeaderBottomColumn,
  HeaderMoveLabelColumn,
  Main
}