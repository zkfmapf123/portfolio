import React, { useState } from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  margin : 0px 2px;
`;

const BlackCircle = st.View`
width : 20px;
height : 20px;
border-radius : 35px;
background-color : ${COLOR.FOCUESED_COLOR};
`;

const WhiteCircle = st.View`
width : 20px;
height : 20px;
border: 1px solid ${COLOR.FOCUESED_COLOR};
border-radius : 35px;
background-color : white;
`;

interface Props{
  isLevel: boolean;
}

export const LevelLabel = ({ isLevel }: Props) => {

  return (
    <Container>
      {
        isLevel ?
          (<BlackCircle />)
          :
          (<WhiteCircle />)
      }
    </Container>
  );
};