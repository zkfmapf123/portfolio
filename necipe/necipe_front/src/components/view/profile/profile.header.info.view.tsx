import React, { useState } from "react";
import st from "styled-components/native";
import { RecipeImage } from "~/components/images/download.recipe.image";
import { COLOR } from "~/Utils/color/color";
import Icons from "react-native-vector-icons/AntDesign";
import { FONTS } from "~/Utils/common/fonts";
import { UserCount } from "../user/userInfo/user.count";
import { launchImageLibrary } from "react-native-image-picker";
import { ToastMessage } from "~/components/message/toast.message";
import { Image, ToastAndroid } from "react-native";
import { apiImageChange } from "~/Utils/api/api.profile";
import { deleteImage, uploadImage } from "~/Utils/middleware/imageUpload";

const Container = st.View`
  flex : 1;
  flex-direction : row;
`;

const PlusButtonCirCleView = st.TouchableOpacity`
position : absolute;
bottom : 0;
right : 0;
margin-right : 5px;
width: 30px;
height: 30px;
border-radius : 15px;
border: 1px solid ${COLOR.INFO_PLUS_BORDER_OUTER_COLOR};
background-color: ${COLOR.INFO_PLUS_BORDER_INNER_COLOR};
`;

const Column = st.View`
  flex : 1;
  justify-content : center
  align-items: center;
`;

const NicknameLabel = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
  font-size : 15px;
  font-family : ${FONTS.nexonMedium};
`;

type infoDataType = {
  nickname: string;
  image_url: string;
  recipeTotal: number;
  friendTotal: number;
  privateId: number;
}

interface Props{
  infoData: infoDataType;
};

export const ProfileHeaderInfoView = ({ infoData}: Props) => {
  const { nickname, image_url, recipeTotal, friendTotal, privateId } = infoData;

  // image
  const [fileName, setFileName] = useState<string>();

  // 파이어베이스에서 이미지 변경 and 삭제
  const firebaseImageUpdate = async ({fileName, fileUrl}): Promise<string> | never => {
    const [isDel, delError] = await deleteImage("users", { fileName: image_url });

    if (!isDel) {
      throw new Error("delete image error")
    }

    const [fileNameString, error] = await uploadImage("users", { fileName: fileName, fileUrl: fileUrl });

    if (fileNameString !== undefined) {
      return fileNameString;
    };

    throw new Error("update image error");
  };

  // 갤러리에서 이미지 선택
  const hardwareImageSelect = async (): Promise<void>=> {
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
        console.error(res.errorCode);
      } else {
        const { fileName, uri } = res.assets[0];
        const fileNameString: string = await firebaseImageUpdate({ fileName: fileName, fileUrl: uri });
        await apiImageChange({ privateId: privateId, imageUrl: fileNameString });
        setFileName(uri);
      }
    });
  };
  
  return (
    <Container>
      {/** image */}
      <Column>
        {
          !fileName ?
            <RecipeImage
            style={{
            width: 80,
            height: 80,
            borderRadius : 40
            }}
              url={image_url}
            fileName="users"/>
            :
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius : 40
              }}
              source={{uri : fileName}}/>
        }
        <PlusButtonCirCleView onPress={()=>hardwareImageSelect()}>
          <Icons style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight : "auto"
          }} name="plus"size={15} color={COLOR.FOCUESED_COLOR}/>
        </PlusButtonCirCleView>
      </Column>
      {/** 정보수정 */}
      <Column>
        <NicknameLabel>{nickname}님</NicknameLabel>
      </Column>
      {/** 게스트 */}
      <Column>
        <UserCount guestNumber={recipeTotal} placholder="게스트"/>
      </Column>
      {/** 게시글 */}
      <Column>
      <UserCount guestNumber={friendTotal} placholder="게시물"/>
      </Column>
    </Container>
  );
};