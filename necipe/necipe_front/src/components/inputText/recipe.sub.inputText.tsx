import React, { useState } from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  flex-direction : column;
  margin-bottom : 10px;
`;

const Label = st.Text`
  margin-bottom : 5px;
  color : ${COLOR.FOCUESED_COLOR};
  font-weight :bold;
`;
const InputText = st.TextInput`
  border: 1px solid ${COLOR.CREATE_INPUT_TEXT_BORDER_OUTER_COLOR};
  background-color: ${COLOR.CREATE_INPUT_TEXT_BORDER_INNTER_COLOR};
  border-radius : 20px;
  padding : 15px;
`;

interface Props{
  title: string;
  placeholder: string;
  onPress: (value: string) => void;
  height: number;
  numOfLine: number;
};

export const RecipeSubInputText = ({ title, placeholder, height, numOfLine, onPress }: Props) => {
  const [value, setValue] = useState<string>("");

  return (
    <Container>
      <Label>Step1 {title}</Label>
      <InputText
        style={{
          height: height
        }}
        numberOfLines={numOfLine}
        keyboardType="twitter"
        placeholder={placeholder}
        value={value}
        onChangeText={(text)=>setValue(text)}
        onEndEditing={()=>onPress(value)}/>
    </Container>
  )
}