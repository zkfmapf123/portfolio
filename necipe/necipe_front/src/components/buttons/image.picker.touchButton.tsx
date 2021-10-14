import React, { useState } from "react";
import { Image, ToastAndroid } from "react-native";
import st from "styled-components/native";
import { launchImageLibrary } from "react-native-image-picker";
import { Alert } from "react-native";
import { COLOR } from "~/Utils/color/color";
import { SimpleLoadingView } from "../Loading/Loading";
import { ToastMessage } from "../message/toast.message";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.TouchableOpacity`
  margin : 5px 0px;
`;

const LabelContainr = st.View`
`;
const Label = st.Text`
  margin : auto;
  color : ${COLOR.FOCUESED_COLOR};
  text-align : center;
  font-family : ${FONTS.nexonRegular};
`;

interface Props{
  containerStyle?: {},
  loadingStyle?:{},
  placeholder: "📷" | string,
  labelStyle?: {};
  giveImageUrl: (fileName: string, url: string) => void;
  imageUrl ?: string | undefined
}

export const ImagePickerTouchButton = ({ imageUrl,loadingStyle,labelStyle,containerStyle, placeholder, giveImageUrl }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<string | undefined>(imageUrl);

  // 이미지 uri 가져오기
  const getImage = async (): Promise<{} | void> => {
    try {
      setLoading(true);
      launchImageLibrary({
        maxHeight: 1000,
        maxWidth: 1000,
        mediaType: "photo",
        quality: 1,
      }, async (res) => {
        if (res.didCancel) {
          ToastMessage({
            label: "사진등록이 취소되었습니다",
            term: ToastAndroid.SHORT,
            position: ToastAndroid.BOTTOM
          });
        } else if (res.errorCode) {
          console.log(res.errorMessage);
        } else {
          const { fileName, uri } = res.assets[0];
          setImg(uri);
          giveImageUrl(fileName, uri);
        }
      })
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Container
      onPress={() => getImage()}>
      {
        loading ?
          (<SimpleLoadingView
            key={0}
            style={loadingStyle} />)
          :
          (img === undefined ?
            <LabelContainr style={containerStyle}>
              <Label style={labelStyle}>{placeholder}</Label>
            </LabelContainr>
            :
            <Image
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
                width: 150,
                height: 150,
                borderRadius : 50,
              }}
              source={{uri: img}}/>)
      }
    </Container>
  );
};