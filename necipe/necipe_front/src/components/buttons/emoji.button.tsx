import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.TouchableOpacity`
  width : 100px;
  flex-direction : row;
  justify-content : center;
  align-items: center;
`;

const Label = st.Text`
  text-align: center;
  margin-left : 5px;
  font-family : ${FONTS.nexonRegular};
`;

interface Props{
  iconName: "like1" | "like2" | "heart" | "hearto";
  label: string;
  onPress: () => void;
}

export const EmojiButton = ({ iconName, label, onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <Icons name={iconName} size={20} color={COLOR.FOCUESED_COLOR} />
      <Label>{label}</Label>
    </Container>
  );
};