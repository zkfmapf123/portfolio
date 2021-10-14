import React, { useCallback, useEffect, useState } from "react";
import CommonStyle from "~/styles/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { getUserId } from "~/Utils/api/api.user";
import { apiProfile, apiProfileFavorite } from "~/Utils/api/api.profile";
import { TitleImage } from "~/components/images/title.image";
import { ProfileHeaderView, ProfileListView } from "~/styles/profile/profile";
import UserStyle from "~/styles/user/user.style";
import { ProfileHeaderInfoView } from "~/components/view/profile/profile.header.info.view";
import { ProfileListButton } from "~/components/view/profile/profile.list.button";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityBase } from "react-native";
import { SimpleLoadingView } from "~/components/Loading/Loading";
import { COLOR } from "~/Utils/color/color";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import { RecipeImage } from "~/components/images/download.recipe.image";
import ProfileMainView from "~/components/view/profile.main.view";
import { DEVISE_WIDTH } from "~/Utils/common/common";

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "Profile">;
}

type userInfoType = {
  privateId: number;
  nickname: string;
  image_url: string;
  recipeTotal: number;
  friendTotal: number;
};

type hashtagType = {
  hashtags: string;
}

type popularRecipeType = {
  cook_thumnail: string;
  recipe_id: number;
};

type recipeDataType = {
  recipe_id: number;
  goodTotal: number;
  cook_title: string;
  cook_thumnail: string;
}

type favoriteDataType = {
  recipe_id: number;
  user_id: number;
  nickname: string;
  cook_title: string;
  cook_thumnail: string;
}

export const Profile = ({ navigation }: Props) => {
  const [privateId, setPrivateId] = useState<number>();
  const [method, setMethod] = useState<"pid" | "favorite">("pid");
  const [mount, setMount] = useState<boolean>(false);
  
  // pagination
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // common
  const [listMove, setListMove] = useState<"내 피드" | "찜 목록">("내 피드");
  const [listMoveArr, setListMoveArr] = useState<boolean[]>([true, false]);
  const [Viewloading, setViewLoading] = useState<boolean>(false);

  // my infos
  const [myInfoData, setMyInfoData] = useState<userInfoType>();
  const [myPopularRecipeData, setMyPopularRecipeData] = useState<popularRecipeType[]>();
  const [myHashtagData, setMyHashtagData] = useState<hashtagType[]>();
  const [myRecipeData, setMyRecipeData] = useState<recipeDataType[]>();

  // favorite
  const [myFavoirteData, setMyFavoriteData] = useState<favoriteDataType[]>();

  // 리스트 움직일 때,
  const setListMenu = useCallback((listMove: "내 피드" | "찜 목록") => {
    if (listMove === "내 피드") {
      setListMove("내 피드");
      setListMoveArr([true, false]);
      setMount(!mount);
      return;
    };

    setListMove("찜 목록");
    setListMoveArr([false, true]);
    setMount(!mount);
  }, [listMoveArr]);

  // 레시피 삭제
  const deleteRecipe = (recipe_id : number) => {
    console.log(recipe_id);
  }

  // 내 피드 불러올 때,
  useEffect(() => {
    setViewLoading(true);

    (async () => {
      try {
        if (listMove === "내 피드") {
          const { privateId } = await getUserId();
          setPrivateId(privateId);
          const {result} = await apiProfile({
            privateId: privateId,
            limit: limit,
            offset: offset
          });
  
          const { myInfo, myHashtag, myPopularRecipes, myRecipes} = result;

          setMyInfoData({
            ...myInfo[0],
            privateId
          });
          setMyHashtagData(myHashtag[0]);
          setMyPopularRecipeData(myPopularRecipes[0]);
          setMyRecipeData(myRecipes[0]);
        } else {
          const {privateId} = await getUserId();
          setPrivateId(privateId);

          const {result} = await apiProfileFavorite({ privateId: privateId });
          const { myInfo, myFavoriteRecipe } = result;
          
          setMyInfoData({
            ...myInfo[0],
            privateId
          });
          setMyFavoriteData(myFavoriteRecipe[0]);
        }
      } catch (e) {
        console.error(e);
      }

      setTimeout(() => {
        setViewLoading(false);
      }, 1000);

    })();
  }, [mount]);

  // 로딩화면
  if (Viewloading) {
    return (
    <CommonStyle.Container>
        {/** header */}
        <CommonStyle.Header>
          <TitleImage onPress={() => console.log("press")} testIconName="meh" />
          <ProfileHeaderView>
            {
              myInfoData &&
              <ProfileHeaderInfoView
                infoData={myInfoData} />
            }
          </ProfileHeaderView>
        </CommonStyle.Header>
        {/** tag list */}
        <ProfileListView>
          <ProfileListButton onPress={()=>setListMenu("내 피드")} placeholder="내 피드" isSelect={listMoveArr[0]} />
          <ProfileListButton onPress={()=>setListMenu("찜 목록")} placeholder="찜 목록" isSelect={listMoveArr[1]} />
        </ProfileListView>
        <UserStyle.UserBodyView>
        <ActivityIndicator style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }} size="large" color={COLOR.FOCUESED_COLOR}/>
        </UserStyle.UserBodyView>
      </CommonStyle.Container>
    )
    // 내 피드
  } else if (listMove === "내 피드") {
    return (
      <CommonStyle.Container>
        {/** header */}
        <CommonStyle.Header>
          <TitleImage onPress={() => console.log("press")} testIconName="meh" />
          <ProfileHeaderView>
            {
              myInfoData &&
              <ProfileHeaderInfoView infoData={myInfoData}/>
            }
          </ProfileHeaderView>
        </CommonStyle.Header>
        {/** tag list */}
        <ProfileListView>
          <ProfileListButton onPress={()=>setListMenu("내 피드")} placeholder="내 피드" isSelect={listMoveArr[0]} />
          <ProfileListButton onPress={()=>setListMenu("찜 목록")} placeholder="찜 목록" isSelect={listMoveArr[1]} />
        </ProfileListView>
        <UserStyle.UserBodyView>
          {/** popular recipes */}
          <UserStyle.BodyColumn>
            <ScrollView horizontal={true}>
              {
                myPopularRecipeData &&
                myPopularRecipeData.map((item, index) => {
                  const recipeId = item.recipe_id;
                  return (
                    <UserStyle.TouchButton
                      onPress={() => navigation.dispatch(CommonActions.navigate("Recipe", {
                        privateId,
                        recipeId
                      }))}
                      key={index}
                      style={{
                        width: 120,
                        height: 120,
                        marginLeft: 5,
                        marginRight: 5,
                        borderRadius : 30,
                      }}>
                      <RecipeImage
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius : 30
                        }}
                        url={item.cook_thumnail}/>
                      </UserStyle.TouchButton>
                  )
                  })
                }
            </ScrollView>
          </UserStyle.BodyColumn>
        {/* hashtags */}
        <UserStyle.BodyColumn
          style={{
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-around",
            alignItems: "center",
            }}>
            <ScrollView horizontal>
          {
            myHashtagData &&
            (myHashtagData.map((item, index) => {
              const str = item.hashtags;
              return (
                <UserStyle.Label
                  style={{
                    marginTop: 5,
                    marginBottom : 10,
                    marginRight : 5
                  }}
                  key={index}>#{str.split("&&")[0]}</UserStyle.Label>
              )
            }))  
              }
              </ScrollView>
          </UserStyle.BodyColumn>
          {/** 최근 게시글 */}
          <UserStyle.RecentlyLabel>최근 게시글</UserStyle.RecentlyLabel>
        <UserStyle.BodyColumn
          style={{
            flex: 1,
            flexDirection: "column",
          }}>
          {
            myRecipeData &&
            <FlatList
              data={myRecipeData}
              renderItem={({item, index})=>(
                <ProfileMainView
                  privateId={privateId as number}
                  recipeItem={item}
                  navigation={navigation}
                  onDelete={()=>deleteRecipe(item.recipe_id)}
                  />
              )}
              keyExtractor={(item, index) => { return String(index) }}
            />
          }
        </UserStyle.BodyColumn>
        </UserStyle.UserBodyView>
      </CommonStyle.Container>
    );
    // 찜 목록
  } else {
    return (
      <CommonStyle.Container>
        {/** header */}
        <CommonStyle.Header>
          <TitleImage onPress={() => console.log("press")} testIconName="meh" />
          <ProfileHeaderView>
            {
              myInfoData &&
              <ProfileHeaderInfoView infoData={myInfoData}/>
            }
          </ProfileHeaderView>
        </CommonStyle.Header>
        {/** tag list */}
        <ProfileListView>
          <ProfileListButton onPress={()=>setListMenu("내 피드")} placeholder="내 피드" isSelect={listMoveArr[0]} />
          <ProfileListButton onPress={()=>setListMenu("찜 목록")} placeholder="찜 목록" isSelect={listMoveArr[1]} />
        </ProfileListView>
        <UserStyle.UserBodyView>
          {
            myFavoirteData &&
            <FlatList
              style={{
                marginLeft: "auto",
                marginRight : "auto"
              }}
              numColumns={3}
              data={myFavoirteData}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    width: Math.round(DEVISE_WIDTH / 3.5),
                    height: Math.round(DEVISE_WIDTH / 3.5),
                    margin: 3
                  }}
                  onPress={() => console.log("게시글로")}>
                  <RecipeImage
                    key={index}
                    style={{
                      margin: 3,
                      borderRadius: 15,
                      width: Math.round(DEVISE_WIDTH / 3.5),
                      height : Math.round(DEVISE_WIDTH)/3.5
                    }}
                    url={item.cook_thumnail}/>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => { return String(index) }}
            />
          }
        </UserStyle.UserBodyView>
      </CommonStyle.Container>
    );
  }
};