import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.TouchableOpacity`
  margin : 5px;
  flex-direction : row;
  align-items: center;
  border: 1px solid ${COLOR.CREATE_INPUT_TEXT_BORDER_OUTER_COLOR};
  background-color: ${COLOR.CREATE_INPUT_TEXT_BORDER_INNTER_COLOR};
  border-radius : 20px;
  height : 40px;
  font-size : 12px;
  padding : 0px 15px;
  
`;
const Label = st.Text`
  font-family : ${FONTS.nexonRegular};
  color :${COLOR.FOCUESED_COLOR};
`;

interface Props{
  title: string;
  onPress: () => void;
}

export const CreateHashtagButton = ({ title, onPress }: Props) => {
  return (
    <Container onPress={onPress}>
      <Label numberOfLines={1}>{title}</Label>
      <Icons name="close" size={10} style={{
        marginLeft: 10,
        color : COLOR.FOCUESED_COLOR
      }} />
    </Container>
  );
};