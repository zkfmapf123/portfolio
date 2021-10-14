import React from "react";
import st from "styled-components/native";

const Container = st.TouchableOpacity`
  margin : 0 auto 20px auto;
`;
const Label = st.Text``;

interface Props{
  onPress: () => void;
  label: string;
}

export const PaginationButton = ({ onPress, label }: Props) => {
  return (
    <Container
      onPress={onPress}>
      <Label>{label}</Label>
    </Container>
  )
}