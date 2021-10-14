import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Body = st.ScrollView`
  margin : 0px 30px;
`;

const BodyHeaderColumn = st.View`
  flex-direction : row;
  justify-content : space-around;
  height : 80px;
`;

const BodyMainColumn = st.View`
  flex: 1;
`;

const BodySubLabel = st.Text`
  width : 80px;
  color: ${COLOR.FOCUESED_COLOR};
  font-weight : bold;
  font-size : 15px;
`;

const BodySubRowColumn = st.SafeAreaView`
  flex-direction : row;
  margin-bottom : 5px;
`;


export default {
  Body,
  BodySubRowColumn,
  BodySubLabel,
  BodyHeaderColumn,
  BodyMainColumn,
}
