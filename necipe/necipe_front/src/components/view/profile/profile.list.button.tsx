import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.TouchableOpacity`
  flex : 1;
  align-items: center;
  padding : 10px 0px;
`;

const Label = st.Text`
  font-size : 15px;
  font-family : ${FONTS.nexonRegular};
  padding : 10px 30px;
  border-radius : 25px;
`;

interface Props{
  onPress: () => void;
  placeholder: string;
  isSelect: boolean;
}

export const ProfileListButton = ({onPress,placeholder, isSelect} : Props) => {
  return (
    <Container onPress={onPress}
      style={{
        borderBottomWidth: 2,
        borderBottomColor: isSelect ? COLOR.FOCUESED_COLOR : "white"
      }}>
      <Label
        style={{
          backgroundColor : isSelect ? COLOR.INFO_PID_AND_LIST_BORDER_INNTER_COLO : "white",
        }}>{placeholder}</Label>
    </Container>
  )
}