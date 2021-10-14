import React, { useState } from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_WIDTH } from "~/Utils/common/common";

const Container = st.View`
  justify-content : center;
  align-items: center;
`;

const InputView = st.View`
  background-color : ${COLOR.BORDER_INNER_COLOR}

  width : ${DEVISE_WIDTH-160}px;
  flex-direction : row;
  justify-content : center;
  align-items: center;
  
  margin : 0px 50px;
`;
const InputText = st.TextInput`
  text-align: center;
`;
const InputTextLabel = st.Text`
  width : 80px;
  margin-right : 5px;
  text-align: center;

  font-weight: bold;
  color : ${COLOR.FONT_COLOR};
`;

const TouchButton = st.TouchableOpacity`
  
  margin : 50px auto auto auto;
  justify-content : center;
  align-items: center;
  border:1px solid black;

  width : 200px;
  border-radius : 35px;
  padding : 3px 0px;
`;

const TouchButtonLabel = st.Text`
  font-size : 20px;
  font-weight: bold;
  color: ${COLOR.FONT_COLOR};
`;

interface Props{
  placeholder: string;
  labelTitle: string;
  buttonLabel: string;
  onSubmit: (title: string) => void;
};

export const JoinNameInput = ({ placeholder, labelTitle, onSubmit, buttonLabel }: Props) => {
  const [input, setInput] = useState<string>("");

  const onPressFunc = (title : string) => {
    onSubmit(title);
  }

  return (
    <Container>
      {/* 닉네임 등록 */}
      <InputView>
        <InputTextLabel>{labelTitle}</InputTextLabel>
        <InputText
        textAlign="center"
        numberOfLines={1}
        placeholder={placeholder}
        value={input}
          onChangeText={(text) => setInput(text)} />
      </InputView>
      {/** 등록 버튼 */}
      <TouchButton
        onPress={()=>onPressFunc(input)}>
        <TouchButtonLabel>{buttonLabel}</TouchButtonLabel>
      </TouchButton>
    </Container>
  );
};

