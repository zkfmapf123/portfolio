import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.SafeAreaView`
  flex-direction : row;
  padding-top : 5px;
  padding-bottom : 10px;
  margin : auto;
`;

const StepLabel = st.Text`
margin : auto;
color : ${COLOR.FOCUESED_COLOR};
font-size : 20px;
font-weight: bold;
margin-right : 5px;
`;

const ShortDescriptionLabel = st.Text`
  background-color : ${COLOR.RECIPE_INNER_INNER_BACKGROUND_COLOR};
  margin : auto 0px;
  padding : 5px 5px;
  font-size : 13px;
`;

interface Props{
  width: number;
  stepIndex: number;
  label: string;
};

const LABEL_WIDTH = 70;

export const ShortDescription = ({ label,width, stepIndex }: Props) => {
  return (
    <Container
      style={{
        width : width
      }}
    >
      <StepLabel
        style={{
          width : LABEL_WIDTH
        }}
      >Step {stepIndex}</StepLabel>
      <ScrollView horizontal={true}>
        <ShortDescriptionLabel
          style={{
            width : width - LABEL_WIDTH
          }}
          numberOfLines={1}>{label}</ShortDescriptionLabel>
      </ScrollView>
    </Container>
  );
};