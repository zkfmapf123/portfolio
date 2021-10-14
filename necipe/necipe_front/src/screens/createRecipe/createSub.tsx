import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { Alert, BackHandler, View } from "react-native";
import { TitleImage } from "~/components/images/title.image";
import { RecipeHeaderLabel } from "~/components/labels/recipe.header.label";
import { RecipeStageTouchButton } from "~/components/buttons/recipe.stage.TouchButton";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import CommonStyle from "../../styles/common";
import CreateSubStyle from "../../styles/createRecipe/sub";
import { RecipeSubInputText } from "~/components/inputText/recipe.sub.inputText";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { DEVISE_HEIGHT, DEVISE_WIDTH } from "~/Utils/common/common";
import { SimpleLoadingView } from "~/components/Loading/Loading";
import { CreateHashtagButton } from "~/components/buttons/create.hashtag.button";
import { CreateRecipeNextTouchButton } from "~/components/buttons/createRecipes.next.touch.button";
import { CreateRecipeAddItemInputText } from "~/components/inputText/create.recipe.add.item.inputText";
import { ImagePickerTouchButton } from "~/components/buttons/image.picker.touchButton";
import { COLOR } from "~/Utils/color/color";
import { recipeSubType } from "~/Utils/types/dto.type";
import { useDispatch, useSelector } from "react-redux";
import { createNeciepItems } from "~/modules/reducer/necipe.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "~/components/message/toast.message";
import { uploadImage } from "~/Utils/middleware/imageUpload";
import { createNavigatorFactory } from "@react-navigation/native";

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "CreateSub">;
  route: any;
}

type imageArrType = {
  fileName: string;
  fileUrl: string;
}

export const CreateSub = ({ navigation, route }: Props) => {
  const privateId = useSelector((state: any) => state.commonReducer.payload);
  const dispatch = useDispatch();
  
  const [userPrivateId, setUserPrivateId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [stage, setStage] = useState<Array<boolean>>([true, false, false, false, false, false]);

  // text
  const [stageNumber, setStageNumber] = useState<number>(1);
  const [shortStr, setShortStr] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tips, setTips] = useState<string>("");
  const [thumnail, setThumnail] = useState<string>("");
  const [stuffs, setStuffs] = useState<Array<string>>([]);

  // image Arr
  const [imgaeArr, setImageArr] = useState<imageArrType[]>([]);

  // loadings
  const [stuffLoading, setStuffLoading] = useState<boolean>(false);
  const [recipeDocsArr, setRecipeDocsArr] = useState<recipeSubType[]>([]);

  // stuff add
  const onAddRecipe = (value : string) => {
    setStuffLoading(true);

    setTimeout(() => {
      stuffs.push(value);
      setStuffLoading(false);
    }, 500);
  };

  // stuff delete
  const onDeleteStuff = (index : number) => {
    setStuffLoading(true);

    setTimeout(() => {
      stuffs.splice(index, 1);
      setStuffLoading(false);
    }, 500);
  };

  // 

  // 중간에 레시피 보기...
  const getStageRecipe = (index: number) => {

  };

  // 다음으로 넘어가기 전 : 검증
  const beforeNextButtonValidation = async() => {
    /**
     * 
     */
  };

  // 다음으로 넘어가기 전 : 배열에 넣기
  const beforeNextButtonPushReecipeArr = async () => {

    recipeDocsArr.push({
      stage: stageNumber,
      shortDescription: shortStr,
      description: description,
      tips: tips,
      stuffs: stuffs,
      thumnail : thumnail
    });
  };

  const recipeInitialize = async() => {
    setShortStr("");
    setDescription("");
    setTips("");
    setThumnail("");
    setStuffs([]);
    setStageNumber(stageNumber + 1)
  }

  // 다음으로 넘어가기 전 : move number
  const beforeNextButtonMoveStage = async () => {
    if (stageNumber === 6) throw new Error("arr size is full");

    for (let index in stage) {
      const formatIndex: number = +index;
      if (formatIndex <= stageNumber) {
        stage[formatIndex] = true;
      } else {
        stage[formatIndex] = false;
      }
    };
  };

  // 다음 버튼
  const onNextButton = async () => {
    try {
      setLoading(true);
      await beforeNextButtonValidation();
      await beforeNextButtonPushReecipeArr();
      
      await beforeNextButtonMoveStage();
      await recipeInitialize();

    } catch (e) {
      console.error(e);
    } finally {
      // Alert
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

  // imageArr 루프돌면서 image uplaod 하기
  const loopSetUploadImage = async () => {
    imgaeArr.map((item, index) => {
      uploadImage("recipes", {
        fileName: item.fileName,
        fileUrl : item.fileUrl
      })
    });
  };

  // next button
  const onCompleteButton = async () => {
    try {
      const { cost, hashtag, imageUrl, level, time, title, category } = route.params.recipe;

      // 해당 내용들을 넣는다.
      await beforeNextButtonPushReecipeArr();

      // imageArr loop돌면서 upload 시키기
      await loopSetUploadImage();

      // userInfo 가져와서 등록하기
      dispatch(createNeciepItems({
        private_id: userPrivateId,
        mainRecipe: {
          cost: cost,
          hashtag: hashtag,
          imageUrl: imageUrl,
          level: level,
          category : category,
          time: time,
          title: title
        },
          subRecipe: recipeDocsArr
        }));
      
      // toast message
      ToastMessage({
        label: "성공적으로 등록되었습니다",
        term: ToastAndroid.SHORT,
        position: ToastAndroid.BOTTOM,
        xOffset: 1,
        yOffset: (DEVISE_HEIGHT / 2.5)
      });
      

      setTimeout(() => {
        //home 으로 이동
        navigation.reset({
          routes: [{ name: "Home" }]
        });
      },500);
    } catch (e) {
      console.error(e);
    };
  };

  // 이미지 배열에 넣기
  const onPushImageArr = ({ fileName, fileUrl }) => {
    setThumnail(fileName);
    const registerImage: imageArrType = {
      fileName: fileName,
      fileUrl: fileUrl
    };
    imgaeArr[stageNumber - 1] = registerImage;
  };

  useEffect(() => {
    if (privateId) {
      setUserPrivateId(privateId);
    }
  }, []);
  
  return (
    <CommonStyle.Container>
      <CommonStyle.Header>
        <TitleImage
          testIconName="meh"/>
        <RecipeHeaderLabel
          title="Step을 입력하세요" />
      </CommonStyle.Header>
      {/* body */}
      {
        loading ?
          (<SimpleLoadingView />)
          :
          (<CreateSubStyle.Body>
            {/* 스테이지 */}
            <CreateSubStyle.BodyHeaderColumn>
              {
                stage.map((item, index) => {
                  return (
                    <RecipeStageTouchButton
                      key={index}
                      stage={`0${index + 1}`}
                      visible={item}
                      onPress={()=>getStageRecipe(index)}/>
                  )
                })
              }
            </CreateSubStyle.BodyHeaderColumn>
            {/* 레시피 */}
            <CreateSubStyle.BodyMainColumn>
              {/* 요약 */}
              <RecipeSubInputText
                title="요약"
                height={50}
                numOfLine={1}
                placeholder=""
                onPress={(text) => setShortStr(text)}/>
              {/* 레시피 */}
              <RecipeSubInputText
                title="레시피"
                height={150}
                numOfLine={5}
                placeholder=""
                onPress={(text) => setDescription(text)} />
              {/* N.tip */}
              <RecipeSubInputText
                title="N.tip"
                height={50}
                numOfLine={1}
                placeholder=""
                onPress={(text) => setTips(text)} />
              {/* stuffs */}
              <CreateSubStyle.BodySubLabel>Step1 재료</CreateSubStyle.BodySubLabel>
              <CreateSubStyle.BodySubRowColumn>
                <ScrollView horizontal={true}>
                  <CreateRecipeAddItemInputText
                    placeholder="+"
                    onEndEditing={(text) => onAddRecipe(text)}
                    style={{
                      width: DEVISE_WIDTH / 5,
                      borderRadius : 20
                    }}/>
                  {
                    stuffLoading ?
                    (<SimpleLoadingView />)
                    :
                    (stuffs.map((item, index) => {
                      return (
                        <CreateHashtagButton
                          onPress={() => onDeleteStuff(index)}
                          key={index}
                           title={item}/>
                      )
                    }))
                  }
                </ScrollView>
              </CreateSubStyle.BodySubRowColumn>
              {/* thumnail image ==> only one*/}
              <ImagePickerTouchButton
                Imagestyle={{
                  width: 80,
                  height: 80,
                  backgroundColor: `${COLOR.CREATE_RECIPES_BODER_INNER_COLOR}`,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: `${COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR}`,
                  borderRadius: 20,
                }}
                containerStyle={{
                  width: 80,
                  height: 80,
                  backgroundColor: `${COLOR.CREATE_RECIPES_BODER_INNER_COLOR}`,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: `${COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR}`,
                  borderRadius: 20,
                }}
                loadingStyle={{
                  width: 80,
                  height: 80,
                  backgroundColor: `${COLOR.CREATE_RECIPES_BODER_INNER_COLOR}`,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: `${COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR}`,
                  borderRadius: 20,
                }}
                giveImageUrl={(fileName, fileUrl) => onPushImageArr({
                  fileName: fileName,
                  fileUrl : fileUrl
                })}
                placeholder="📷"
                />
            </CreateSubStyle.BodyMainColumn>
          </CreateSubStyle.Body>)  
      }
      <CreateRecipeNextTouchButton
        method="label"
        marginRight={70}
        placholder="다음단계"
        iconName="chevron-right"
        onPress={() => onNextButton()} />
      <CreateRecipeNextTouchButton
        method="button"
        marginRight={0}
        placholder=""
        iconName="check"
        onPress={()=>onCompleteButton()}/>
    </CommonStyle.Container>
  );
};