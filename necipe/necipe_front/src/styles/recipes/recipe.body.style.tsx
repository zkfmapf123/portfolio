import st from "styled-components/native";

const Body = st.SafeAreaView`
  flex : 1;
`;

const BottomMoveView = st.View`
  height : 50px;
  flex-direction : row;
  justify-content : center;
  align-items: center;
`;


export default {
  Body,
  BottomMoveView
}
