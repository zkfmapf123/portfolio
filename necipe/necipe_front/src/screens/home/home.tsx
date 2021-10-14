import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, FlatList, Text, ToastAndroid, TouchableOpacity } from "react-native";
import CommonStyle from "~/styles/common";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { ExitQuestionModal } from "~/components/modal/exit.question.modal";
import { TitleImage } from "~/components/images/title.image";
import { SearchInputText } from "~/components/inputText/search.inputText";
import { AlterDotTouchButton } from "~/components/buttons/alter.dot.touch.button";
import { FooterComponent, RecipeList } from "~/components/list/recipe.list";
import homeStlye from "~/styles/home/home.stlye";
import { apiBeforeGetSearchPopular, apiBeforeGetSearchRecent, apiGetSearchRecipes } from "~/Utils/api/api.search";
import { SearchLabel } from "~/components/view/search/search.before.text";
import { ScrollView } from "react-native-gesture-handler";
import { COLOR } from "~/Utils/color/color";
import { ToastMessage } from "~/components/message/toast.message";
import { RecipeImage } from "~/components/images/download.recipe.image";
import { DEVISE_WIDTH } from "~/Utils/common/common";
import { HomeOrderView } from "~/components/view/home/home.order.view";
import { getMyProfile } from "~/Utils/api/api.auth";

interface Props {
  navigation: StackNavigationProp<StackNavigationTypes, "Home">;
  route: any;
};

// popular & recnetly
type searchRecipeType = {
  recipe_id: number;
  cook_title: string;
  cook_thumnail: string;
};

// search data
type searchRecipeArrType = {
  recipe_id: number;
  cook_title: string;
  cook_thumnail: string;
};

const SelectOption = [
  {
    key: 1,
    section: true,
    label : "최신순",
  }, {
    key: 2,
    label: "인기순",
  }, {
    key : 3,
    label : "비용순"
  }
];

export const Home = ({ navigation, route }: Props) => {

  const [privateId, setPrivateIdNumber] = useState<number>();
  const [mount, setMount] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);

  const [homeMethod, setHomeMethod] = useState<"home" | "search">("home");

  // search
  const [searchMethod, setSearchMethod] = useState<"인기검색" | "최근검색">("인기검색");
  const [searchResult, setSearchResult] = useState<searchRecipeType[]>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchData, setSearchData] = useState<searchRecipeArrType[]>([]);

  const [searchRefresh, setSearchRefresh] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(true);

  const [searchOption, setSearchOption] = useState<{
    offset: number;
    limit: number;
  }>({
    offset: 0,
    limit: 20,
  });

  // 입력값 출력
  const searchUseHashtag = (text: string) => {
    setSearchText(text);
  };

  // 검색 결과 가져오기
  const getSearchRecipeData = async () => {
    try {
      setSearchLoading(false);
      if (homeMethod === "search" && searchText !== "") {
        const { result } = await apiGetSearchRecipes({
          privateId: privateId,
          method: "hashtag",
          limit: searchOption?.limit,
          offset: searchOption?.offset,
          value: searchText,
          sort: "rand"
        });
        setSearchData([...searchData, ...result]);
        return;
      };

      ToastMessage({
        label: "검색화면 및 검색어를 설정해주세요",
        term: ToastAndroid.SHORT,
        position: ToastAndroid.BOTTOM
      });

      return;

    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setSearchLoading(true);
        setSearchRefresh(false);
      }, 1000);
    }
  };

  // pagination
  const searchPagination = () => {
    console.log("pagination");

    // offset과 총 량을 해서 제한을 둔다.
  };

  // refresing
  const searchRefreshing = () => {
    console.log("refresing");
  };


  // search view로 바꾸기
  const onChangeSearchMethod = async () => {
    setHomeMethod("search");

    // 최근검색 있는지 확인하고,
    const { result } = await apiBeforeGetSearchPopular({ private_id: privateId });
    setSearchMethod("인기검색");
    setSearchResult(result);
  }

  // 뒤로가기 메서드
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setDialog(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }
    }, []),
  );

  const onMoveRecipeDetail = (recipe_id: number) => {
    const recipeId = recipe_id;
    navigation.dispatch(CommonActions.navigate("Recipe", {
      privateId,
      recipeId
    }))
  }

  // 앱 실행 시 바로 시작
  useEffect(() => {
    setDialog(false);
    setHomeMethod("home");

    (async () => {
      try {
        const result = await getMyProfile();
        const resultToString = JSON.parse(result);
        setPrivateIdNumber(resultToString.privateId);
      } catch (e) {
        console.error(e);
      }
    })();

    // clean-up
    return () => {
      // setSearchHashtag("");
    };
  }, [mount]);

  return (
    <CommonStyle.Container>
      {
        dialog &&
        <ExitQuestionModal
          title="Notice"
          description="앱을 종료하시겠습니까?"
          onCancle={() => setDialog(false)}
          onExit={() => BackHandler.exitApp()} />
      }
      <CommonStyle.Header>
        {/* 타이틀 */}
        <AlterDotTouchButton
          onPress={() => navigation.dispatch(CommonActions.navigate("Alert"))} />
        <TitleImage
          onPress={() => setHomeMethod("home")}
          testIconName="meh" />
        {/* 검색 */}
        <SearchInputText
          placeholder="검색( 요리를 검색해보세요 )"
          onCompleteSubmit={() => getSearchRecipeData()}
          onCurorInputPress={() => onChangeSearchMethod()}
          onSubmitText={(text) => searchUseHashtag(text)} />
      </CommonStyle.Header>
      {
        homeMethod === "home" ?
          /*                  if  home recipe list                          */
          (<CommonStyle.ListContainer>
            {
              privateId &&
              <RecipeList
                privateId={privateId}
                navigation={navigation} />
            }
          </CommonStyle.ListContainer>)
          :
          /*                 else      search                              */
          (<homeStlye.SearchView>
            {/* 인기 검색 & 최근 검색 */}
            <homeStlye.SearchColumn
              style={{
                flexDirection: "row"
              }}>
              <SearchLabel
                style={{
                  borderRightWidth: 2,
                  paddingRight: 10,
                  borderColor: `${COLOR.NOT_FOCUESD_COLOR}`,
                  borderStyle: "solid",
                  marginRight: 15,
                  marginTop: "auto",
                  marginBottom: "auto"
                }}
                placeholder={searchMethod} />
              <ScrollView horizontal>
                {
                  searchResult &&
                  searchResult.map((item, index) => {
                    return (
                      <SearchLabel
                        key={index}
                        style={{
                          borderWidth: 1,
                          borderColor: `${COLOR.NOT_FOCUESD_COLOR}`,
                          borderRadius: 30,
                          marginRight: 10,
                        }}
                        placeholder={item.cook_title}
                        onPress={() => onMoveRecipeDetail(item.recipe_id)} />
                    )
                  })
                }
              </ScrollView>
            </homeStlye.SearchColumn>
            <homeStlye.SearchColumn
              style={{
                height : 140,
                marginLeft: 15,
                marginRight: 15,
              }}>
              <ScrollView horizontal>
                {
                  searchResult &&
                  searchResult.map((item, index) => {
                    const thumnail = item.cook_thumnail;
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: "column",
                          margin : 5,
                          width: 130,
                          height: 110,
                        }}
                        key={index}
                        onPress={() => onMoveRecipeDetail(item.recipe_id)}>
                        <Text style={{
                          width: 130,
                          padding: 3,
                          textAlign: "center",
                          borderColor: `${COLOR.NOT_FOCUESD_COLOR}`,
                          borderWidth: 1,
                          borderTopLeftRadius: 15,
                          borderTopRightRadius : 15,
                          backgroundColor: `${COLOR.HEADER_BACKGROUND_COLOR}`,
                        }}>Best</Text>
                        <RecipeImage
                          style={{
                            width: 130,
                            height: 100,
                          }}
                          url={thumnail} />
                      </TouchableOpacity>
                    )
                  })
              }
            </ScrollView>
            </homeStlye.SearchColumn>
            {/* 인기순 & 비용순 & 최신순 */}
            <homeStlye.SearchColumn
              style={{ alignItems : "flex-end", marginRight : 15}}>
              <HomeOrderView isSelect={true}/>
            </homeStlye.SearchColumn>
            {/* 검색 */}
            <homeStlye.SearchColumn
              style={{
                flex: 1,
                margin: 15
              }}>
              <FlatList
                style={{
                  flex: 1,
                  flexDirection: "column"
                }}
                contentContainerStyle={{
                  alignItems: "center"
                }}
                numColumns={3}
                data={searchData}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      width: Math.round(DEVISE_WIDTH / 3.5),
                      height: Math.round(DEVISE_WIDTH / 3.5),
                      margin : 3,
                    }}
                    onPress={() => onMoveRecipeDetail(item.recipe_id)}>
                    <RecipeImage
                      key={index}
                      style={{
                        margin: 3,
                        borderRadius: 15,
                        width: Math.round(DEVISE_WIDTH / 3.5),
                        height: Math.round(DEVISE_WIDTH / 3.5)
                      }}
                      url={item.cook_thumnail} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => { return String(index) }}
                ListFooterComponent={<FooterComponent loading={searchLoading} />}
                refreshing={searchRefresh}
                onRefresh={searchRefreshing}
                onEndReached={searchPagination}
                onEndReachedThreshold={1}
              />
            </homeStlye.SearchColumn>
          </homeStlye.SearchView>)
      }
      {/* recipe items */}
    </CommonStyle.Container>
  );
};