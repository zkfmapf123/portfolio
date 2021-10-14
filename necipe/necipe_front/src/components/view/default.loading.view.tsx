import React from "react";
import { ActivityIndicator } from "react-native";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  flex : 1;
  justify-content : center;
  align-items: center;
`;

export const DefaultLoadingView = () => {
  return (
    <Container>
      <ActivityIndicator
        size="large"
        color={COLOR.FOCUESED_COLOR} />
    </Container>
  );
};