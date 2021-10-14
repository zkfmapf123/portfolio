import React, { useState } from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";

const Container = st.View`
  flex-direction : row;
`;

const SelectColumn = st.TouchableOpacity`
flex-direction : row;
align-items: center;
`;

const NotSelectColumn = st.View`
flex-direction : row;
`;

const Label = st.Text``;

const TouchButton = st.TouchableOpacity``;

interface Props{
  onPress: (order : string) => void;
}

export const HomeOrderView = ({ onPress}: Props) => {
  const [isSelect, setIsSelect] = useState<boolean>(true);
  const [select, setSelect] = useState<"최신순" | "인기순" | "비용순">("최신순");

  const changeOption = (text : string) => {
    setSelect(text);
    setIsSelect(true);
    //onPress(select);
  }
  
  return (
    <Container>
      {
        isSelect ?
          (<SelectColumn onPress={()=>setIsSelect(false)}>
            <Label style={{
              marginRight : 5
            }}>{select}</Label>
            <Icons name="caretdown" size={10}/>
          </SelectColumn>)
          :
          (<NotSelectColumn>
            <TouchButton onPress={()=>changeOption("최신순")}>
              <Label style={{
                marginRight : 10,
              }}>최신순</Label>
            </TouchButton>
            <TouchButton onPress={()=>changeOption("인기순")}>
              <Label style={{
                marginRight : 10,
              }}>인기순</Label>
            </TouchButton>
            <TouchButton onPress={()=>changeOption("비용순")}>
              <Label style={{
                marginRight : 10,
              }}>비용순</Label>
            </TouchButton>
          </NotSelectColumn>)
      }
    </Container>
  );
};