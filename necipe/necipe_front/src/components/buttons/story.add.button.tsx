import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign"
import { COLOR } from "~/Utils/color/color";

const Container = st.TouchableOpacity`
  background-color : ${COLOR.HEADER_BACKGROUND_COLOR};
  padding :5px;
`;

interface Props{
  onPress: () => void;
}

export const StoryAddPlusButton = ({onPress} : Props) => {
  return (
    <Container>
      <Icons
        name="plus"
        size={60}
        color={COLOR.FOCUESED_COLOR} />
    </Container>
  );
};