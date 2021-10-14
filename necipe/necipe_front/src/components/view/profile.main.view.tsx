import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import { deleteToGoodOrFavorite, updateToGoodOrFavorite } from "~/modules/api";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_HEIGHT, DEVISE_WIDTH } from "~/Utils/common/common";
import { FONTS } from "~/Utils/common/fonts";
import { getDownloadImageUrl } from "~/Utils/middleware/imageUpload";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { EmojiButton } from "../buttons/emoji.button";
import { RecipeImage } from "../images/download.recipe.image";
import Icons from "react-native-vector-icons/EvilIcons";

const Container = st.View`
  border : 2px solid ${COLOR.NOT_FOCUESD_COLOR};
  margin : 0 auto 20px auto;
  width : ${DEVISE_WIDTH - 50}px;
`;

/*                      header                        */
const Header = st.View`
  flex-direction : row;
  justify-content : space-between;
  align-items: center;
  color : ${COLOR.BACKGROUND_COLOR};
  padding : 10px 0px;
`;

const TouchButton = st.TouchableOpacity``;

const HeaderNicknameLabel = st.Text`
  font-size : 15px;
  font-weight: bold;
  color : ${COLOR.FOCUESED_COLOR};
  margin : 2px 15px;
  font-family: ${FONTS.nexonMedium};
`;
const HeaderTitleLabel = st.Text`
  font-size : 15px;
  font-weight: bold;
  color : ${COLOR.FOCUESED_COLOR};
  margin : 2px 15px;
  font-family: ${FONTS.nexonMedium};
`;

/*                      main                        */
const Main = st.View`
`;

const MainTopColumnTouchButton = st.TouchableOpacity`
  flex: 1;
  background-color : ${COLOR.NOT_FOCUESD_COLOR};
`;

const MainBottomColumn = st.View`
  padding : 7px 0px;
  height : 40px;
  flex-direction :row;
  justify-content : space-between;
  align-items: center;
`;

type itemType = {
  cook_thumnail: string;
  cook_title: string;
  goodTotal: number;
  recipe_id: number;
}

interface Props{
  privateId: number;
  recipeItem: itemType;
  navigation: StackNavigationProp<StackNavigationTypes, "Home"> | StackNavigationProp<StackNavigationTypes, "User">;
  onDelete: () => void;
};

const HOME_IMAGE_WIDTH = DEVISE_WIDTH - 50;
const HOME_IMAGE_HEIGHT = DEVISE_HEIGHT / 3.5;

const ProfileMainView = ({
  privateId,
  recipeItem,
  navigation,
  onDelete
}: Props) => {

  const [comment, setComment] = useState<boolean>(false);
  const [str, setStr] = useState<string>("");

  // 게시글로 이동
  const onMoveRecipeDetail = () => {
    const recipeId = recipeItem.recipe_id;
    navigation.dispatch(CommonActions.navigate("Recipe", {
      privateId,
      recipeId,
    }));
  };
  
  return (
    <Container>
      {/* 닉네임, 타이틀 보여주는 Header */}
      <Header
        style={{
          borderBottomWidth: 2,
          borderBottomColor: `${COLOR.NOT_FOCUESD_COLOR}`
        }}>
        <TouchButton
          onPress={() => onMoveRecipeDetail()}>
          <HeaderTitleLabel>{recipeItem.cook_title}</HeaderTitleLabel>
        </TouchButton>
        <TouchButton onPress={onDelete}>
          <Icons style={{
            marginTop: "auto",
            marginBottom : "auto"
          }} name="trash" size={30} color={COLOR.FOCUESED_COLOR}/>
        </TouchButton>
      </Header>
      {/* 이미지, 좋아요 부분 */}
      <Main
        style={{
          height : HOME_IMAGE_HEIGHT + 40
        }}>
        {/* image */}
        <MainTopColumnTouchButton
          onPress={() => onMoveRecipeDetail()}>
          <RecipeImage
            style={{
              width: HOME_IMAGE_WIDTH-5,
              height: HOME_IMAGE_HEIGHT,
            }}
            url={recipeItem.cook_thumnail} />
        </MainTopColumnTouchButton>
      </Main>
    </Container>
  );
};

export default React.memo(ProfileMainView);