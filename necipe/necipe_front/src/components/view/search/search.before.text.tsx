import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.TouchableOpacity`
`;
const Label = st.Text`
  padding : 7px 15px;
`;

interface Props{
  style: any;
  placeholder: string;
  onPress?: () => void;
}

export const SearchLabel = ({ placeholder, onPress, style }: Props) => {
  
  return (
    <Container onPress={onPress}>
      <Label style={style}>{placeholder}</Label>
    </Container>
  );
};