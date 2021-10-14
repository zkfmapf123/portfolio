import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_HEIGHT } from "~/Utils/common/common";


const Main = st.SafeAreaView`
  flex-direction : row;
  align-items: center;
`;


const ImageScrollFooter = st.SafeAreaView`
flex : 1;
`;

const SearchView = st.View`
  flex : 1;
`;
const SearchColumn = st.View`
  margin : 5px 0px;
`;

export default {
  Main,
  ImageScrollFooter,
  SearchView,
  SearchColumn,
}