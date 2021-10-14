import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/AntDesign";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.View`
  flex: 1;
`;

const TouchButton = st.TouchableOpacity`
  flex : 1.5;
  justify-content : flex-end;
  align-items: center;
`;

const TouchButtonLabel = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.nexonRegular};
  margin : 10px;
`;

const EmptyView = st.View`
  height : 20px;
`;

const PlaceholderView = st.View`
  flex: 1;
  justify-content : flex-start;
  align-items: center;
`;
const PlaceholderLabel = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.nexonRegular};
  font-size : 15px;
  padding: 3px;
`;

interface Props{
  onPress: () => void;
  buttonIcons: "reload1" | "home";
  buttonLabel: string;
  firstLabel: string;
  lastLable: string;
}

export const EmptyLoadingButton = ({ onPress, buttonIcons, buttonLabel, firstLabel, lastLable }: Props) => {
  
  return (
    <Container>
      {/** touch Button */}
      <TouchButton onPress={onPress}>
        <Icons name={buttonIcons} size={50} color={COLOR.FOCUESED_COLOR} />
        <TouchButtonLabel>{buttonLabel}</TouchButtonLabel>
      </TouchButton>
      <EmptyView/>
      {/** placeholder */}
      <PlaceholderView>
        <PlaceholderLabel>{firstLabel}</PlaceholderLabel>
        <PlaceholderLabel>{lastLable}</PlaceholderLabel>
      </PlaceholderView>
    </Container>
  );
};