import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.SafeAreaView`
  background-color : ${COLOR.RECIPE_INNER_INNER_BACKGROUND_COLOR};
  margin : 0 auto;
`;

const Label = st.Text`
  padding : 10px;
`;

interface Props{
  width: number;
  description: string;
}

export const Description = ({width, description}) => {
  return (
    <Container
      style={{
        width: width,
        height : 150
      }}>
      <ScrollView>
        <Label>{description}</Label>
      </ScrollView>
    </Container>
  )
}