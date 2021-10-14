import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const LabelView = st.View`
  flex : 0.5;
  justify-content : flex-start;
  align-items: center;
`;

const Label = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
  text-align : center;
  font-family : ${FONTS.bingleBold};
  font-size : 18px;
`;

interface Props{
  title: string;
}

export const RecipeHeaderLabel = ({ title }: Props) => {
  return (
    <LabelView>
      <Label>{title}</Label>
    </LabelView>
  );
};