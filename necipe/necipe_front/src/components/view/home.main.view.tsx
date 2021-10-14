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
  cook_cost: number;
  cook_hashtags: string;
  cook_star: number;
  cook_thumnail: string;
  cook_time: number;
  cook_title: string;
  created_datetime: string;
  isFavorite: boolean;
  isGood: boolean;
  nickname: string;
  recipe_id: number;
  user_id?: number;
  uid?: number;
}

interface Props{
  privateId: number;
  recipeItem: itemType;
  navigation: StackNavigationProp<StackNavigationTypes, "Home"> | StackNavigationProp<StackNavigationTypes, "User">;
};

const HOME_IMAGE_WIDTH = DEVISE_WIDTH - 50;
const HOME_IMAGE_HEIGHT = DEVISE_HEIGHT / 3.5;

const HomeMainView = ({
  privateId,
  recipeItem,
  navigation
}: Props) => {

  const [comment, setComment] = useState<boolean>(false);
  const [str, setStr] = useState<string>("");

  const [good, setGood] = useState<boolean>(recipeItem.isGood);
  const [favorite, setFavorite] = useState<boolean>(recipeItem.isFavorite);

  // 게시글로 이동
  const onMoveRecipeDetail = () => {
    const recipeId = recipeItem.recipe_id;
    navigation.dispatch(CommonActions.navigate("Recipe", {
      privateId,
      recipeId,
    }));
  };

  // 유저로 이동
  const onMoveUserDetail = () => {
    const userId = recipeItem.uid === undefined ? recipeItem.user_id : recipeItem.uid;
    navigation.dispatch(CommonActions.navigate("User", {
      privateId,
      userId
    }));
  };

  const writeComment = () => {
    // str 공백 validatoin

    setComment(true);
  };

  // 좋아요 or 찜하기 update
  const updateGoodAndFavorite = async (type: "good" | "favorite", { uid, rid }) => {
    try {
      await updateToGoodOrFavorite(type, { uid: uid, rid: rid })
        .then(() => {
          if (type === "good") {
            setGood(true);
          } else {
            setFavorite(true);
          };
        });
    } catch (e) {
      console.error(e);
    }
  };
  
  // 좋아요 or 찜하기 delete
  const deleteGoodAndFavorite = async (type: "good" | "favorite", { uid, rid }) => {
    try {

      await deleteToGoodOrFavorite(type, { uid: uid, rid: rid })
        .then(() => {
          if (type === "good") {
            setGood(false);
          } else {
            setFavorite(false);
          };
        });
    } catch (e) {
      console.error(e);
    }
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
          onPress={() => onMoveUserDetail()}>
          <HeaderNicknameLabel>{recipeItem.nickname}</HeaderNicknameLabel>
        </TouchButton>
        <TouchButton
          onPress={() => onMoveRecipeDetail()}>
          <HeaderTitleLabel>{recipeItem.cook_title}</HeaderTitleLabel>
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
        {/* 좋아요 찜하기 */}
        <MainBottomColumn>
          {
            good ?
              (<EmojiButton iconName="heart" label={"좋아요"}
                onPress={() => deleteGoodAndFavorite("good", { uid: privateId, rid: recipeItem.recipe_id })} />)
              :
              (<EmojiButton iconName="hearto" label={"좋아요"}
                onPress={() => updateGoodAndFavorite("good", { uid: privateId, rid: recipeItem.recipe_id })} />)
          }
          {
            favorite ?
              (<EmojiButton iconName="like1" label={"찜"}
                onPress={() => deleteGoodAndFavorite("favorite", { uid: privateId, rid: recipeItem.recipe_id })} />)
              :
              (<EmojiButton iconName="like2" label={"찜"}
                onPress={() => updateGoodAndFavorite("favorite", { uid: privateId, rid: recipeItem.recipe_id })} />)
          }
        </MainBottomColumn>
      </Main>
    </Container>
  );
};

export default React.memo(HomeMainView);