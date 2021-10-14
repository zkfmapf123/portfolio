import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_HEIGHT } from "~/Utils/common/common";

const Container = st.SafeAreaView`
  flex : 1;
  background-color: #FFFFFF;
`;

const Header = st.View`
  padding :10px;
  height : ${DEVISE_HEIGHT/5}px;
  background-color : ${COLOR.HEADER_BACKGROUND_COLOR};
  margin-bottom : 10px;
`;

const ListContainer = st.SafeAreaView`
  flex : 1;
`;

const CommonTouchButton = st.TouchableOpacity``;


export default {
  Container,
  Header,
  ListContainer,
  CommonTouchButton,
};
