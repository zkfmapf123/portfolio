import React, { useState } from "react";
import st from "styled-components/native";

const Container = st.View`
width : 90%;
height : 70px;
flex-direction : row;
border: 2px solid white;
margin : 0 auto;
`
const Column = st.View`
  margin: auto;
  justify-content : center;
  align-items: center;
`;

const NicknameLabel = st.Text``;
const AfterLabel = st.Text``;
const CreateLabel = st.Text``;

interface Props{
  nickname: string;
  message: string;
  createdDatetime: string;
};

export const AlertLogs = ({ nickname, message, createdDatetime }: Props) => {
  const [dateTime, setDateTime] = useState<string>();

  return (
    <Container>
      {/* 닉네임 + comment */}
      <Column>
      
      </Column>
      {/* 날짜 */}
      <Column>
      
      </Column>
    </Container>
  )
}