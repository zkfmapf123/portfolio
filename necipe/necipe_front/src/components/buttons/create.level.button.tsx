import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  flex-direction : row;
  margin-right : 5px;
`;

const TouchButton = st.TouchableOpacity`
`;

const WihteCircle = st.View`
  width : 20px;
  height : 20px;
  border: 1px solid ${COLOR.FOCUESED_COLOR};
  border-radius : 35px;
  background-color : white;
`;
const BlackCircle = st.View`
  width : 20px;
  height : 20px;
  border-radius : 35px;
  background-color : ${COLOR.FOCUESED_COLOR};
`;

interface Props{
  onPress: () => void;
  visible : boolean
}

export const CreateLevelButton = ({ onPress, visible }: Props) => {
  return (
    <Container>
      <TouchButton onPress={onPress}>
        {
          visible ?
            (<BlackCircle />)
            :
            (<WihteCircle />)
        }
      </TouchButton>
    </Container>
  );
};