import React from "react";
import { ActivityIndicator } from "react-native";
import st from "styled-components/native";

const Container = st.View`
  margin: auto;
`;

type styleType = {
  width: number;
  height: number;
  backgroundColor?: string;
  borderStyle?: "solid";
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
}

interface Props{
  style ?: styleType
}

export const SimpleLoadingView = ({style} : Props) => {
  return (
    <Container
      style={style}>
      <ActivityIndicator
        animating={true}
        style={{
          marginTop : style === undefined ? 10 : style.height / 2
        }}
        size="small"
        color="#707070" />
    </Container>
  );
};