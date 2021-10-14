import React from "react";
import st from 'styled-components/native';
import Icons from "react-native-vector-icons/AntDesign";

const Container = st.TouchableOpacity`

`;
const Label = st.Text``;

interface Props{
  iconName: "left";
  placeholder: string;
  containerStyle: {};
  onPress: () => void;
}

export const BackPressButton = ({onPress, iconName, placeholder, containerStyle }: Props) => {
  return (
    <Container style={containerStyle} onPress={onPress}>
      <Icons name={iconName} size={15} />
      <Label>{placeholder}</Label>
    </Container>
  );
};