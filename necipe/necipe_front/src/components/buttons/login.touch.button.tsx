import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/Feather";
import { DEVISE_WIDTH } from "~/Utils/common/common";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const TouchButton = st.TouchableOpacity`
  width : ${DEVISE_WIDTH - 150}px;
  height : 50px;

  background-color : ${COLOR.BORDER_INNER_COLOR};
  justify-content : center;
  align-items: center;
`;

const TouchButtonLabel = st.Text`
  color : ${COLOR.FONT_COLOR};
  font-family : ${FONTS.nexonMedium};
`;

interface Props{
  title: string;
  onPress: () => void;
};

export const LoginTouchButton = ({ title, onPress }: Props) => {
  return (
    <TouchButton
      onPress={onPress}>
      <TouchButtonLabel>{title}</TouchButtonLabel>
    </TouchButton>
  );  
};