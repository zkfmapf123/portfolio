import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import Icons from "react-native-vector-icons/Entypo";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.View`
  flex-direction : row;
  position : absolute;
  bottom : 0;
  right : 0;
  align-items: center;
`;

const TouchButton = st.TouchableOpacity`

  background-color : ${COLOR.CREATE_RECIPES_BODER_INNER_COLOR};
  border: 1px solid ${COLOR.FOCUESED_COLOR};
  border-radius : 45px;
  padding : 10px;
  width : 55px;
`;

const Label = st.Text`
  color : ${COLOR.CREATE_RECIEPS_THUMNAIL_INNER_LABEL_COLOR};
  font-size :13px;
  margin-right : 10px;
  font-family : ${FONTS.nexonRegular};
`;

interface Props{
  placholder?: string;
  iconName: "chevron-right" | "check";
  onPress: () => void;
  marginRight: number;
  method : "button" | "label"
}

export const CreateRecipeNextTouchButton = ({ placholder, iconName, onPress, marginRight, method }: Props) => {

  if (method === "button") {
    return (
      <Container
        style={{
          marginRight: (35 + marginRight),
          marginBottom : 10,
        }}>
        <Label>{placholder}</Label>
        <TouchButton
          onPress={onPress}>
          <Icons
            style={{
              textAlign:"center"
            }}
            name={iconName} size={30} color={COLOR.FOCUESED_COLOR} />
          </TouchButton>
      </Container>
    )
  } else {
    return (
      <Container
        style={{
          marginRight: (35 + marginRight),
          alignItems: "center",
          marginBottom : 25,
        }}>
        <Label>{placholder}</Label>
        <Icons name={iconName} size={18} color={COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR}/>
      </Container>
    )
  }
};