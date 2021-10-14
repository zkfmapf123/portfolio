import React from "react";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.TouchableOpacity`
  flex : 1;
`;

const Label = st.Text`
  text-align : center;
  padding : 10px 0px;
`;

interface Props{
  isVisible: boolean;
  placeholder: string;
  onPress: () => void;
};

export const AlertMoveLable = ({ isVisible, placeholder,onPress }: Props) => {
  
  return (
    <Container onPress={onPress}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: isVisible ?
          `${COLOR.ALERT_MOVE_BORDER_BOTTOM_VISIBLE_COLOR}`
          :
          `${COLOR.ALERT_MOVE_BORDER_BOTTOM_NOT_VISIBLE_COLOR}`
      }}>
      <Label>{placeholder}</Label>
    </Container>
  );
};