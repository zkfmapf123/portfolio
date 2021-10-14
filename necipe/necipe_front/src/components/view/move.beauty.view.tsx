import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  height: 10px;
  margin : 0 8px;
  border : 1px solid ${COLOR.FOCUESED_COLOR};
  border-radius : 25px;
`;

interface Props{
  isCurrent: boolean;
}

export const MoveBeautyView = ({ isCurrent }: Props) => {
  
  if (isCurrent) {
    // 동작 x
    return (
      <Container
        style={{
          width: 15,
          backgroundColor : `#FFFFFF`
        }}
      />
    )
  } else {
    // 동작 o
    return (
      <Container
        style={{
          width: 50,
          backgroundColor : `#EFEFEF`,
        }}
      />
    )
  }
};