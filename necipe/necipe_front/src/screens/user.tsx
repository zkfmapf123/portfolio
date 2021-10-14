import { CommonActions, StackNavigationState } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RecipeImage } from "~/components/images/download.recipe.image";
import { TitleImage } from "~/components/images/title.image";
import HomeMainView from "~/components/view/home.main.view";
import { UserInfo } from "~/components/view/user/userInfo/user.info";
import CommonStyle from "~/styles/common";
import UserStyle from "~/styles/user/user.style";
import { apiUser } from "~/Utils/api/api.user";
import { hashtagType, PopularRecipeType, userInfoType } from "~/Utils/types/dto.type";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "User">;
  route: any;
};

export const User = ({ navigation, route }: Props) => {
  
  const { privateId, userId } = route.params;

  const [user, setUser] = useState<userInfoType>();
  const [popularRecipes, setPopularRecipes] = useState<PopularRecipeType[]>();
  const [hashtags, setHashtag] = useState<hashtagType[]>();
  const [orderCreatedRecipes, setOrderCreatedRecipes] = useState<[]>();
  
  useEffect(() => {
    
    (async() => {
      const {userInfo, popularRecipes, hashtags, createdRecipes} = await apiUser({
        private_id: privateId,
        user_id: userId,
        offset: 0,
        limit: 10
      });
      
      setUser(userInfo);
      setPopularRecipes(popularRecipes[0]);
      setHashtag(hashtags[0]);
      setOrderCreatedRecipes(createdRecipes[0]);
    })();
  }, []);
  
  return (
    <CommonStyle.Container>
      {/* header => userInfo */}
      <CommonStyle.Header>
        {/* title image */}
        <TitleImage testIconName="meh"/>
        {/* userInfo */}
        <UserStyle.HeaderColumn>
        {
          user &&
          <UserInfo userInfo={user}/>
        }
        </UserStyle.HeaderColumn>
      </CommonStyle.Header>
      {/* body */}
      <UserStyle.UserBodyView>
        {/* favorite recipes */}
        <UserStyle.BodyColumn>
        <ScrollView horizontal={true}>
        {
          popularRecipes &&
              popularRecipes.map((item, index) => {
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
                  height : 120,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius : 30,
                }}>
                <RecipeImage
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius : 30,
                  }}
                  url={item.cook_thumnail} />
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
            hashtags &&
            (hashtags.map((item, index) => {
              const str = item.hashtags;
              return (
                <UserStyle.Label key={index}>#{str.split("&&")[0]}</UserStyle.Label>
              )
            }))  
          }
          </ScrollView>
        </UserStyle.BodyColumn>
        {/* order created_recipes */}
        <UserStyle.RecentlyLabel>최근 게시글</UserStyle.RecentlyLabel>
        <UserStyle.BodyColumn
          style={{
            flex: 1,
            flexDirection: "column",
          }}>
          {
            orderCreatedRecipes &&
            <FlatList
              data={orderCreatedRecipes}
              renderItem={({item, index})=>(
                <HomeMainView
                  privateId={privateId}
                  recipeItem={item}
                  navigation={navigation}/>
              )}
              keyExtractor={(item, index) => { return String(index) }}
            />
          }
        </UserStyle.BodyColumn>
      </UserStyle.UserBodyView>
    </CommonStyle.Container>
  );
};