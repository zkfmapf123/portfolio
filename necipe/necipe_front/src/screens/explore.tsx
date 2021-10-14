import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import st from "styled-components/native";
import { EmptyLoadingButton } from "~/components/buttons/empty.loading.butotn";
import CommonStyle from "~/styles/common";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "Explore">;
}

export const Explore = ({navigation} : Props) => {
  
  return (
    <CommonStyle.Container>
      <EmptyLoadingButton
        onPress={()=>navigation.dispatch(CommonActions.navigate("Home"))}
        buttonIcons="home"
        buttonLabel="홈으로 가기"
        firstLabel="서비스 준비 중 입니다."
        lastLable="더욱 더 알찬 서비스로 보답하겠습니다. 꾸벅"/>
    </CommonStyle.Container>
  );
};