import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import CommonStyle from "~/styles/common";
import JoinStyle from "~/styles/auth/join";
import { JoinImageTouchButton } from "~/components/buttons/join.image.touch.button";
import { Alert, ToastAndroid } from "react-native";
import { JoinNameInput } from "~/components/buttons/join.name.input.button";
import { launchImageLibrary } from "react-native-image-picker";
import { authDto, userInfoType } from "~/Utils/types/dto.type";
import SERVER from "~/Utils/api/apiConnect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { ImagePickerTouchButton } from "~/components/buttons/image.picker.touchButton";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";
import { ToastMessage } from "~/components/message/toast.message";
import { apiUserRegister, saveUserType } from "~/Utils/api/api.auth";
import { uploadImage } from "~/Utils/middleware/imageUpload";


interface JoinProps{
  navigation: StackNavigationProp<StackNavigationTypes, "Join">;
  route: any;
}

export const Join = ({ navigation, route }: JoinProps) => {
  const [img, setImg] = useState<{
    fileName: string,
    fileUrl : string
  }>({
    fileName: "",
    fileUrl : ""
  });
  const [user, setUser] = useState<authDto>(route.params.userInfo);
  const { userAccessToken, userAccessTokenExpiredInDate, userPirvateId } = route.params.userInfo;

  const saveUserInfoMobile = async (userId: number | string) => {

    const userInfo: saveUserType = {
      privateId: userId,
      accessToken: userAccessToken,
      expiredInDate: userAccessTokenExpiredInDate,
    };

    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  };
  
  const registerUser = async (nickname: string) => {
    
    if (nickname === "") {
      ToastMessage({
        label: "올바른 닉네임을 적어주세요",
        term: ToastAndroid.SHORT,
        position: ToastAndroid.BOTTOM
      });
      return;
    };

    const [isCreate, userId] = await apiUserRegister({
      privateId: userPirvateId,
      imageUrl : img.fileName,
      method: "kakao",
      os: "andrlid",
      nickname: nickname
    });

    if (!isCreate) {
      ToastMessage({
        label: "이미 중복되는 닉네임이 존재합니다",
        term: ToastAndroid.SHORT,
        position: ToastAndroid.BOTTOM
      });
      return;
    };

    ToastMessage({
      label: "잠시만 기다려주세요",
      term: ToastAndroid.SHORT,
      position: ToastAndroid.BOTTOM
    });

    await saveUserInfoMobile(userId);
    if (img.fileUrl !== "") {
      await uploadImage("users", { fileName: img.fileName, fileUrl: img.fileUrl });
    }

    setTimeout(() => {
      navigation.dispatch(CommonActions.navigate("Tab"));
    })
  };


  return (
    <CommonStyle.Container>
      <JoinStyle.Header>
        <JoinStyle.HeaderTitleLabel>Profile</JoinStyle.HeaderTitleLabel>
      </JoinStyle.Header>
      <JoinStyle.Main>
        {/* 이미지 등록 */}
        <ImagePickerTouchButton
          containerStyle={{
            width: 120,
            height: 120,
            borderRadius : 60,
            borderWidth: 1,
            borderColor: `${COLOR.BORDER_OUTER_COLOR}`,
            backgroundColor : `${COLOR.BORDER_INNER_COLOR}`
          }}
          placeholder="프로필 사진"
          labelStyle={{
            color: `${COLOR.BORDER_OUTER_COLOR}`,
            fontFamily : `${FONTS.nexonMedium}`,
          }}  
          giveImageUrl={(fileName :string, url : string)=>setImg({fileName : fileName, fileUrl : url})}/>
      </JoinStyle.Main>
      <JoinStyle.Footer>
        {/* 닉네임 등록 */}
        <JoinNameInput
          placeholder="닉네임을 입력하세요"
          labelTitle="닉네임"
          buttonLabel="등록"
          onSubmit={(title)=>registerUser(title)}/>
      </JoinStyle.Footer>
    </CommonStyle.Container>
  );
};