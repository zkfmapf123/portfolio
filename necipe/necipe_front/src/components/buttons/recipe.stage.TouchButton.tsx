import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.TouchableOpacity`
  border : 1px solid ${COLOR.CREATE_RECIPE_SUB_STAGE_OUTER_COLOR};
  border-radius : 35px;
  width : 40px;
  height :40px;
`;
const Label = st.Text`
  margin : auto;
  color : ${COLOR.FOCUESED_COLOR};
`;

interface Props{
  stage: string;
  visible: boolean;
  onPress: () => void;
};

export const RecipeStageTouchButton = ({ stage, visible, onPress }: Props) => {
  return (
    <Container
      style={{
        backgroundColor : !visible ? `${COLOR.CREATE_RECIPE_SUB_STAGE_NOT_SELECT_COLOR}` : `${COLOR.CREATE_RECIPE_SUB_STAGE_SELECT_COLOR}`
      }}
      onPress={onPress}>
      <Label>{stage}</Label>
    </Container>
  );
};