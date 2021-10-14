import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.TouchableOpacity`
  flex : 1;
  justify-content : center;
  align-items: center;
`;

const Label = st.Text`
  font-family : ${FONTS.nexonRegular};
  color : ${COLOR.FOCUESED_COLOR};
`;

interface Props{
  guestNumber: number;
  placholder: string;
  onPress?: () => void;
}

export const UserCount = ({onPress, guestNumber, placholder }: Props) => {
  return (
    <Container onPress={onPress}>
      <Label style={{fontSize : 15, marginBottom : 5}}>{guestNumber}</Label>
      <Label>{placholder}</Label>
    </Container>
  );
};