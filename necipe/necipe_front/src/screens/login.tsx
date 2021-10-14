import React from "react";
import CommonStyle from "~/styles/common";
import LoginStyle from "~/styles/auth/login";
import { LoginTouchButton } from "~/components/buttons/login.touch.button";
import { authDto } from "~/Utils/types/dto.type";
import { CommonActions, StackNavigationState } from "@react-navigation/native";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { StackNavigationProp } from "@react-navigation/stack";
import { apiUserValidation, kakaoLogin, kakaoUserInfoType, saveUserType } from "~/Utils/api/api.auth";
import { ToastAndroid } from "react-native";
import { ToastMessage } from "~/components/message/toast.message";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface LoginProps{
  navigation: StackNavigationProp<StackNavigationTypes, "Login">;
}

export const Login = ({ navigation}: LoginProps) => {

  const saveUser = async(userInfo : kakaoUserInfoType, privateId : number) => {
    const saveeUserInfo: saveUserType = {
      privateId: privateId,
      accessToken: userInfo.userAccessToken as string,
      expiredInDate: userInfo.userAccessTokenExpiredInDate,
    };

    await AsyncStorage.setItem("userInfo", JSON.stringify(saveeUserInfo));
  }

  const loginReturnUserInfo = async () => {
    const userInfo: kakaoUserInfoType | null = await kakaoLogin();

    if (userInfo === null) {
      ToastMessage({
        label: "관리자에게 문의하세요",
        term: ToastAndroid.LONG,
        position: ToastAndroid.BOTTOM
      });
      return;
    };

    let userId : undefined | number | void = await apiUserValidation(userInfo.userPirvateId)
      .catch((e) => {
        console.error(e);
        userId = undefined;
      });
    
    if (userId === undefined) {
      navigation.dispatch(CommonActions.navigate("Join", {
        userInfo
      }));
    } else {
      await saveUser(userInfo,userId as number);
      navigation.dispatch(CommonActions.navigate("Tab"));
    };
  };
  
  return (
    <CommonStyle.Container>
      <LoginStyle.Header>
        <LoginStyle.HeaderTitleLabel>Login</LoginStyle.HeaderTitleLabel>
      </LoginStyle.Header>
      <LoginStyle.EmptyView/>
      <LoginStyle.Main>
        <LoginTouchButton onPress={()=>loginReturnUserInfo()} title="카카오로 로그인"/>
      </LoginStyle.Main>
    </CommonStyle.Container>
  );
};
