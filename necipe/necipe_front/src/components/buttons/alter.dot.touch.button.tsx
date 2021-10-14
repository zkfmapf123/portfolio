import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const AlertTouchButton = st.TouchableOpacity`
  position : absolute;
  top : 0;
  right : 0;
  margin-top : 10px;
  margin-right : 15px;

  width : 40px;
  height : 40px;
`;

const ButtonDot = st.View`
  background-color : ${COLOR.HOME_HEADER_ALERT_DOT_COLOR};
  width : 8px;
  height: 8px;
  border-radius : 35px;
  margin : auto;
`;

interface Props{
  onPress: () => void;
}

export const AlterDotTouchButton = ({onPress} : Props) => {
  return (
    <AlertTouchButton
      onPress={onPress}>
      <ButtonDot/>
    </AlertTouchButton>
  );
};
