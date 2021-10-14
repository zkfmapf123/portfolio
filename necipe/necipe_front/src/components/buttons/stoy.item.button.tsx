import React from "react";
import { ToastAndroid } from "react-native";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";

const Container = st.TouchableOpacity`
  flex : 1;
  border: 1px solid ${COLOR.FOCUESED_COLOR};
  border-radius : 45px;

  width : 70px;
  height : 70px;

  margin : 0px 10px;
`;

const Column = st.View`
  margin : auto;
  border-radius: 40px;
  width : 55px;
  height : 55px;
  border: 1px solid ${COLOR.FOCUESED_COLOR};
`;

interface Props{
  thumnail: string;
  onPress: () => void;
}

export const StoryItemButton = ({ thumnail, onPress }: Props) => {
  
  // 서비스 진행 중 알림
  const serviceProgressingAndroidToastMessage = () => {
    ToastAndroid.showWithGravityAndOffset(
      '서비스 준비 중 입니다',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      1,
      100
    )
  };

  return (
    <Container
      onPress={()=>serviceProgressingAndroidToastMessage()}>
      <Column>
        {/* images */}
      </Column>
    </Container>
  );
};