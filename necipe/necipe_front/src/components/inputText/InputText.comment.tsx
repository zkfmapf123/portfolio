import React, { useState } from "react";
import st from "styled-components/native"
import { COLOR } from "~/Utils/color/color";
import Icons from "react-native-vector-icons/AntDesign";

const Container = st.View`
  flex-direction :row;
  align-items: center;
  justify-content : space-between;  
`;

const InputText = st.TextInput`

`;

const TouchButton = st.TouchableOpacity``;

interface Props {
  iconName: "check" | "arrowup" | "";
  style: { };
  firstTitle?: string;
  placeholder: string;
  onEndWrite(write: string): void;
}

export const InputTextCommon = ({iconName,style, firstTitle = "", placeholder, onEndWrite } : Props) => {
  const [value, setValue] = useState<string>("");

  const validationValue = () => {
    // validation
    setValue("");
    onEndWrite(value);
  }
  
  return (
    <Container
      style={style}>
        <InputText
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={`${firstTitle}${placeholder}`} />
      <TouchButton onPress={() => validationValue()}>
        <Icons name={iconName} size={15}/>
      </TouchButton>
    </Container>
  )
}