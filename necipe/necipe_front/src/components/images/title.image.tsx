import React from "react";
import { Image } from "react-native";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";
import { COLOR } from "~/Utils/color/color";

const Container = st.TouchableOpacity`
  flex: 1;
  width : 150px;
  justify-content : center;
  align-items: center;
  margin : 0 auto;
`;

interface Props{
  testIconName: "meh"
  onPress?: () => void;
};

export const TitleImage = ({ testIconName, onPress}: Props) => {
  return (
    <Container onPress={onPress}>
      <Image
        source={require("~/assets/necip_home_logo.png")}/>
    </Container>
  );
};