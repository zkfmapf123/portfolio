import React, { useEffect, useState } from "react";
import CommonStyle from "~/styles/common";
import { recipeMainType, recipeMainTypes, recipeSubType } from "~/Utils/types/dto.type";
import RecipeStyle from "~/styles/recipes/recipe.body.style";
import { ScrollView } from "react-native-gesture-handler";
import { RecipeDefaultHeaderLabel } from "~/components/labels/recipe.detail.header.label";
import { SimpleLoadingView } from "~/components/Loading/Loading";
import { AlterDotTouchButton } from "~/components/buttons/alter.dot.touch.button";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { RecipeView } from "~/components/view/recipe/recipe.view";
import { getDownloadImageUrl } from "~/Utils/middleware/imageUpload";
import { LastRecipe } from "~/components/view/recipe/lastRecipe";
import { DEVISE_WIDTH } from "~/Utils/common/common";
import { getOneNecipe } from "~/modules/api";
import { MoveBeautyView } from "~/components/view/move.beauty.view";

interface Props {
  route: any;
  navigation: StackNavigationProp<StackNavigationTypes, "Recipe">;
}

type subRecipeObjType = {
  stage: number;
  short_str: string;
  description: string;
  tips: string;
  stuffs: string;
  image_url: string;
}

const RECIPE_CONTAINER_WIDTH = DEVISE_WIDTH / 1.2;

export const Recipe = ({ route, navigation }: Props) => {
  const { recipeId, privateId } = route.params;
  
  const [levelArr, setLevelArr] = useState<boolean[]>([false, false, false]);

  const [downloadImageArr, setDownloadImageArr] = useState<string[]>(["", "", "", "", "", ""]);
  
  const [mainRecipe, setMainRecipe] = useState<recipeMainTypes>();
  const [subRecipeArr, setSubRecipeArr] = useState<subRecipeObjType[]>();


  // header => level을 시각화 한다.
  const levelFormatToArray = (star: number) => {
    let arr: boolean[] = [false, false, false];

    for (let i = 0; i < levelArr.length; i++) {
      if (i <= star - 1) {
        levelArr[i] = true;
      } else {
        levelArr[i] = false;
      }
    }
    
    return levelArr;
  };

  // header => cost를 시각화 한다.
  const formatToCost = (cost : number) => {
    const stringToCost: string = String(cost);
    let stringToCostLength: number = stringToCost.length - 1;
    
    let result: string = "";
    let i = 1;

    while (stringToCostLength != -1) {
      result = `${stringToCost[stringToCostLength--]}${result}`

      if (i % 3 === 0) {
        i = 1;
        result = `,${result}`;
      } else {
        i++;
      }
    }

    if (result.startsWith(",")) {
      result = result.substring(1, result.length);
    }
    
    return result;
  };

  // 전처리
  const beforeView = async () => {
    await getOneNecipe(recipeId)
      .then((result) => {
        setMainRecipe(result?.mainRecipe);
        setSubRecipeArr(result?.subRecipe);
        // setMoveArr(result?.subRecipe.length);
      });
  };
 
  useEffect(() => {

    // body 작업
    (async () => {
      await beforeView();
    })();

  }, []);

    return (
      <CommonStyle.Container>
        {/* header + alter navgation */}
        <CommonStyle.Header>
          <AlterDotTouchButton
            onPress={() => navigation.dispatch(CommonActions.navigate("Alert", {
                privateId
            }))} />
          {
            // main recipe
            mainRecipe &&
            <RecipeDefaultHeaderLabel
              title={mainRecipe.cook_title}
              category={mainRecipe.cook_category}
              time={mainRecipe.cook_time}
              cost={formatToCost(mainRecipe.cook_cost)}
              level={levelFormatToArray(mainRecipe.cook_star)}/>
          }
        </CommonStyle.Header>
        {/* body  + scroll view*/}
        <RecipeStyle.Body>
          {
            // sub recipe
            subRecipeArr &&
            <ScrollView
              onScroll={(e) => {
                // console.log(e.nativeEvent.contentOffset.x);
                // console.log(e.nativeEvent.contentSize.width);
              }}
              style={{
                marginRight: 10,
                marginLeft : 10
              }}
              horizontal={true}>
              {
                subRecipeArr.map((item, index) => {
                  return (
                    <RecipeView
                      containerWidth={RECIPE_CONTAINER_WIDTH}
                      key={index}
                      uri={item.image_url}
                      shortDescription={item.short_str}
                      description={item.description}
                      tips={item.tips}
                      stepIndex={index + 1}
                      stuffs={item.stuffs}/>
                  )              
                })
              }
              <LastRecipe
                privateUserId={privateId}
                recipeId = {recipeId}
                nickname={"배고파"}
                url={mainRecipe?.cook_thumnail}
                width={RECIPE_CONTAINER_WIDTH} />
            </ScrollView>
          }
        </RecipeStyle.Body>
        {/* bottom horizon ==> 수정해야 한다.*/}
        <RecipeStyle.BottomMoveView>
          <MoveBeautyView isCurrent={true} />
          <MoveBeautyView isCurrent={true}/>
          <MoveBeautyView isCurrent={false}/>
          <MoveBeautyView isCurrent={true}/>
          <MoveBeautyView isCurrent={true}/>
        </RecipeStyle.BottomMoveView>
      </CommonStyle.Container>
    )
};