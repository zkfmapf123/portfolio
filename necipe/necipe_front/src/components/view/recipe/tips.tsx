import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import st from "styled-components/native";

const Container = st.SafeAreaView`
  margin : auto;
  flex-direction : row;
`;

const TipsLabel = st.Text`
  margin-right : 5px;
`;
const Label = st.Text``;

interface Props{
  width: number;
  tips: string;
}

export const Tips = ({ tips, width }: Props) => {
  return (
    <Container
      style={{
        width : width
      }}
    >
      <TipsLabel>N.tip. </TipsLabel>
      <ScrollView horizontal={true}>
        <Label>{tips}</Label>
      </ScrollView>
    </Container>
  );
};