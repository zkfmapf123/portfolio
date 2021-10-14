import React, { useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import Icons from "react-native-vector-icons/AntDesign";
import { ToastMessage } from "../message/toast.message";

const Container = st.View`
  margin: 5px 0px;
  flex-direction : row;
  align-items: center;
  height : 40px;
`;

const InputText = st.TextInput`
margin : 5px 0px;
border: 1px solid ${COLOR.CREATE_INPUT_TEXT_BORDER_OUTER_COLOR};
background-color: ${COLOR.CREATE_INPUT_TEXT_BORDER_INNTER_COLOR};
height : 40px;
font-size : 12px;
padding : 0px 15px;
`;

const IconView = st.TouchableOpacity`
  border: 1px solid ${COLOR.CREATE_INPUT_TEXT_BORDER_OUTER_COLOR};
  padding : 5px;
  border-radius : 50px
  margin-right : 10px;
`;

interface Props{
  placeholder : "#" | "+" | "📷" | "";
  onEndEditing: (text: string) => void;
  style: {
    width: number;
    height?: number;
    borderRadius: number;
    fontFamily: string,
    color: string
  };
};

export const CreateRecipeAddItemInputText = ({ placeholder, onEndEditing, style }: Props) => {
  const [value, setValue] = useState<string>("");
  const [on, setOn] = useState<boolean>(false);

  const beforeOnEndEditing = () => {
    const formattingValue = value.replace(/\s/gi, "");
    if (formattingValue === "") {
      ToastMessage({
        label: "빈칸을 주의하세요",
        term: ToastAndroid.SHORT,
        position: ToastAndroid.CENTER
      });
    } else {
      onEndEditing(formattingValue);
      setOn(false);
    }
    setValue("");
  };

  const onCreateHandleEvent = (): void => {
    if (!on) {
      setOn(true);
      return;
    };

    ToastMessage({
      label: "검색어를 입력하세요",
      term: ToastAndroid.SHORT,
      position: ToastAndroid.CENTER
    });
    return;
  }

  return (
    <Container>
      {/** icon touch button */}
      <IconView onPress={() => onCreateHandleEvent()}>
        <Icons name="plus" size={20} color={COLOR.FOCUESED_COLOR} />
      </IconView>
      {/** text input */}
      {
        on &&
        <InputText
          textAlign="center"
          keyboardType="twitter"
          style={style}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => setValue(text)}
          onEndEditing={() => beforeOnEndEditing()} />
      }
    </Container>
  );
};