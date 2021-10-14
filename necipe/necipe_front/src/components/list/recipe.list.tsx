import { StackNavigationProp } from "@react-navigation/stack";
import st from "styled-components/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { getRecipes } from "~/Utils/api/apiHome";
import { RecipeView } from "../view/recipe/recipe.view";
import HomeMainView from "../view/home.main.view";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { SimpleLoadingView } from "../Loading/Loading";
import { EmptyLoadingButton } from "../buttons/empty.loading.butotn";

const Container = st.SafeAreaView``;

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "Home">;
  privateId: number;
};

type dataType = {
  cook_category: string;
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
  uid: number;
}

// footer view
export const FooterComponent = ({ loading}) => {

  if (!loading) {
    return (
      <Container style={{
          marginTop : "auto",
          marginBottom : "auto"
        }}>
          <SimpleLoadingView/>
        </Container>
      );
  } else {
    return (
      <Container/>
    )
  }
};

export const RecipeList = ({ privateId, navigation }: Props) => {
  const [offset, setOffset] = useState<number>(0);
  const [data, setData] = useState<dataType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refershing, setRefreshing] = useState<boolean>(true);
  const [mount, setMount] = useState<boolean>(false);

  // pagination
  const pagination = () => {
    // 무한 endReached 안되게끔
    if (loading) {
      setLoading(false);
      setOffset(offset + 2);
      setMount(!mount);
    }
  };
  
  // refresh
  const handleRefresh = () => {
    setOffset(0);
    setData([]);
    setLoading(false); // paginagtion
    setRefreshing(true);
    setMount(!mount);
  };

  // data uploading
  useEffect(() => {
    // recipe fetch
    (async () => {

      const { recieps } = await getRecipes({
        private_id: privateId,
        offset: offset,
        limit: 10,
        orderMethod: "rand"
      });

      setData([...data, ...recieps])
    })();
    
    setTimeout(() => {
      setLoading(true); // pagination
      setRefreshing(false); 
    }, 1000);
  }, [mount]);

  if (data.length !== 0) {
    return (
      <Container>
        {
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <HomeMainView
                privateId={privateId}
                recipeItem={item}
                navigation={navigation} />
            )}
            keyExtractor={(item, index) => { return String(index) }}
            ListFooterComponent={<FooterComponent loading={loading} />}
            refreshing={refershing}
            onRefresh={handleRefresh}
            onEndReached={pagination}
            onEndReachedThreshold={1}
          />
        }
      </Container>
    )
  } else {
    return (
      <Container style={{
        flex : 1,
      }}>
        <EmptyLoadingButton
          onPress={() => setMount(!mount)}
          buttonIcons="reload1"
          buttonLabel="새로고침"
          firstLabel="검색을 통해서 레시피를 찾고"
          lastLable="친구도 추가해 보세요" />
      </Container>
    )
  }
};