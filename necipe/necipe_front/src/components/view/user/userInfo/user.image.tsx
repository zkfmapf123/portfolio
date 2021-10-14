import React from "react";
import st from "styled-components/native";

const Container = st.View`
  flex : 1;
  border : 1px solid black;
  border-radius : 50px;
`;

interface Props{
  imageUrl: string;
}

// 보류
export const UserImage = ({imageUrl} : Props) => {
  
  return (
    <Container>

    </Container>
  );
};