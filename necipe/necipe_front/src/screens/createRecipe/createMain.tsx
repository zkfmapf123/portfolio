import React from "react";
import { useState } from "react";
import st from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { CreateRecipeNextTouchButton } from "~/components/buttons/createRecipes.next.touch.button";
import { TitleImage } from "~/components/images/title.image";
import { CreateHashtagButton} from "~/components/buttons/create.hashtag.button";
import { RecipeHeaderLabel } from "~/components/labels/recipe.header.label";
import CommonStyle from "~/styles/common";
import CreateMainStyle from "~/styles/createRecipe/main";
import { DEVISE_WIDTH} from "~/Utils/common/common";
import { SimpleLoadingView } from "~/components/Loading/Loading";
import { CreateLevelButton } from "~/components/buttons/create.level.button";
import ModalSelector from "react-native-modal-selector";
import { CommonActions} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { CreateRecipeAddItemInputText } from "~/components/inputText/create.recipe.add.item.inputText";
import { ImagePickerTouchButton } from "~/components/buttons/image.picker.touchButton";
import { COLOR } from "~/Utils/color/color";
import { uploadImage } from "~/Utils/middleware/imageUpload";
import { recipeMainType } from "~/Utils/types/dto.type";
import { useSelector } from "react-redux";
import { FONTS } from "~/Utils/common/fonts";

const RowColumn = st.View`flex-direction : row; margin : 10px 0px`;

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "CreateMain">
};

const IMAGE_LABEL_WIDTH = DEVISE_WIDTH - 100;

export const CreateMain = ({ navigation}: Props) => {

  const [text, setText] = useState<string>("");
  const [num, setNum] = useState<number | string>(" ");

  const [levelLoding, setLevelLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<Array<boolean>>([true, false, false]);

  const [category, setCategory] = useState<string>("한식");

  // uplaod image
  const [image, setImage] = useState<{ fileName, fileUrl }>({
    fileName: "",
    fileUrl : "",
  });
  
  // search
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  // recipeMain
  const [recipeMain, setRecipeMain] = useState<recipeMainType>({
    title: "",
    hashtag: [],
    category : "",
    level: 1,
    time: "30 분",
    imageUrl: "",
    cost: 0
  });

  // 소요시간 selector
  const data = [
    { key: 1, section: true, label: "소요시간" },
    { key: 2, label: "10 분" },
    { key: 3, label: "30 분" },
    { key: 4, label: "60 분" },
    { key: 5, label: "120 분" },
    { key: 6, label: "180 분"},
  ];

  const categoryData = [
    { key: 1, section: true, label: "카테고리" },
    { key :2, label : "한식"},
    {key :3 , label : "양식"},
    {key :4 , label : "일식"},
    {key :5 , label : "간식"},
    {key :6 , label : "채식"},
    {key :7 , label : "자취요리"},
    {key :8 , label : "파티요리"},
    {key :9 , label : "다이어트"},
    {key :10 , label : "명절음식"},
    {key :11 , label : "베이킹"}
  ]

  const setTitle = (title: string) => {
    recipeMain.title = title;
  };

  const setLevelNumber = (level: number) => {
    recipeMain.level = level;
  }

  const setTime = (time: string) => {
    recipeMain.time = time;
  };

  const setCost = (cost: number) => {
    recipeMain.cost = cost;
  };

  const setImageUrl = (fileName : string | undefined, url: string | undefined) => {
    image.fileName = fileName;
    image.fileUrl = url
  };

  // 검색어 부분
  const onHandleEndEditing = (value: string) => {
    setSearchLoading(true);
    
    setTimeout(() => {
      recipeMain.hashtag.push(value);
      setSearchLoading(false);
    }, 500);
  };

  // 해쉬태그 없애기
  const deleteHahshtag = (index: number) => {
    setSearchLoading(true);
    setTimeout(() => {
      recipeMain.hashtag.splice(index, 1);
      setSearchLoading(false);
    }, 500);
  };

  // 레벨 설정하기
  const onHandleLevel = (num: number) => {
    setLevelLoading(true);
    setLevelNumber(num+1);
    for (let i = 0; i < level.length; i++) {
      if (i <= num) {
        level[i] = true;
      } else {
        level[i] = false;
      }
    };
    
    setTimeout(() => {
      setLevelLoading(false);
    }, 1000);
  };

  const onHandleNext = async() => {
    // if (recipeMain.title.trim() === "") {
    //   // 제목은 나와야 한다...
    // };

    // if (image.fileUrl !== "") {
    //   const [fileName, error] = await uploadImage("recipes", {
    //     fileName: image.fileName,
    //     fileUrl: image.fileUrl
    //   });

    //   // 정상적으로 처리 된 경우
    //   if (fileName !== undefined) {
    //     recipeMain.imageUrl = fileName;
    //   }

    //   // exeception 문제가 있는경우
    // }

    console.log(recipeMain);
    console.log(image);
    
    // exception 아예 없는 경우
    // navigation.dispatch(CommonActions.navigate("CreateSub", {
    //   recipe: recipeMain
    // }));
  }

  return (
    <CommonStyle.Container>
      {/* header */}
      <CommonStyle.Header>
        <TitleImage
          testIconName="meh"/>
        <RecipeHeaderLabel
          title="오늘의 요리는 무엇인가요?"/>
      </CommonStyle.Header>
      <CreateMainStyle.Body>
        {/* 카테고리 */}
        <CreateMainStyle.BodyCookSearchView>
          <CreateMainStyle.BodyTopLabel>카테고리</CreateMainStyle.BodyTopLabel>
          <ModalSelector
            style={{
              marginTop: 10,
              width: DEVISE_WIDTH / 5,
              borderRadius: 30,
            }}
            data={categoryData}
            initValue={category}
            onChange={(option) => {
              setCategory(option.label);
              recipeMain.category = category
            }} />
        </CreateMainStyle.BodyCookSearchView>
        {/* 타이틀 입력 부분 */}
        <CreateMainStyle.BodyCookTitleView>
          <CreateMainStyle.BodyTopLabel>요리명</CreateMainStyle.BodyTopLabel>
          <CreateMainStyle.BodyInputText
            style={{ fontFamily: FONTS.nexonRegular, color: COLOR.FOCUESED_COLOR }}
            textAlign="center"
            placeholder="#"
            value={text}
            onChangeText={(text) => setText(text)}
            onEndEditing={() => setTitle(text)}/>
        </CreateMainStyle.BodyCookTitleView>
        {/* 검색어 입력 부분 */}
        <CreateMainStyle.BodyCookSearchView>
          <CreateMainStyle.BodyTopLabel>검색어</CreateMainStyle.BodyTopLabel>
          <ScrollView horizontal={true}>
            <CreateRecipeAddItemInputText
              style={{
                width: 100,
                borderRadius: 20,
                fontFamily: FONTS.nexonRegular,
                color: COLOR.FOCUESED_COLOR
              }}
              placeholder="#"
              onEndEditing={(text)=>onHandleEndEditing(text)}/>
            {
              searchLoading ?
                (<SimpleLoadingView/>)
                :
                (
                  recipeMain.hashtag.map((item, index) => {
                    return (
                      <CreateHashtagButton
                        onPress={()=>deleteHahshtag(index)}
                        key={index}
                        title={item}/>
                    )
                  }))
            }
          </ScrollView>
        </CreateMainStyle.BodyCookSearchView>
        {/* thumnail 입력 부분 */}
        <CreateMainStyle.BodyThumnailView>
          <CreateMainStyle.BodyTopLabel>대표이미지</CreateMainStyle.BodyTopLabel>
          <ImagePickerTouchButton
            placeholder="사진이나 동영상을 첨부할 수 있습니다"
            containerStyle={{
              width: IMAGE_LABEL_WIDTH,
              height: 200,
              backgroundColor: `${COLOR.CREATE_RECIPES_BODER_INNER_COLOR}`,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: `${COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR}`,
              borderRadius: 20,
              marginTop: 0,
              marginRight: "auto",
              marginBottom: 0,
              marginLeft : "auto"
            }}
            Imagestyle={{
              width: 200,
              height: 200,
              borderRadius: 20,
              marginTop: 0,
              marginRight: "auto",
              marginBottom: 0,
              marginLeft : "auto"
            }}
            loadingStyle={{
              width: IMAGE_LABEL_WIDTH,
              height: 200,
              backgroundColor: `${COLOR.CREATE_RECIPES_BODER_INNER_COLOR}`,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: `${COLOR.CREATE_RECIEPS_BORDER_OUTER_COLOR}`,
              borderRadius: 20
            }}
            giveImageUrl={(fileName, fileUrl)=>setImageUrl(fileName, fileUrl)}/>
        </CreateMainStyle.BodyThumnailView>
        {/* 그 외 옵션들 */}
        <CreateMainStyle.BodyOptionColumn>
          {/* 난이도 */}
          <RowColumn>
            <CreateMainStyle.BodyTopLabel>난이도</CreateMainStyle.BodyTopLabel>
            {
              levelLoding ?
                (<SimpleLoadingView />)
                :
                (level.map((item, index) => {
                  return (
                    <CreateLevelButton
                      key={index}
                      visible={item}
                      onPress={() => onHandleLevel(index)} />
                  )
                })
              )
            }
          </RowColumn>
          {/* 소요시간 */}  
          <RowColumn>
            <CreateMainStyle.BodyTopLabel
              style={{

            }}>소요시간</CreateMainStyle.BodyTopLabel>
            <ModalSelector
              style={{
                width: DEVISE_WIDTH / 5,
                borderRadius : 30
              }}
              data={data}
              initValue={recipeMain.time}
              onChange={(option)=>setTime(option.label)}/>
          </RowColumn>
          {/* 가격 */}
          <RowColumn>
            <CreateMainStyle.BodyTopLabel>가격</CreateMainStyle.BodyTopLabel>
            <CreateMainStyle.BodyInputText
              style={{
                fontFamily: FONTS.nexonRegular,
                color: COLOR.FOCUESED_COLOR}}
              value={`${num}`}
              textAlign="center"
              keyboardType="number-pad"
              onChangeText={(num) => setNum(num)}
              onEndEditing={() => setCost(num as number)} />
            <CreateMainStyle.BodyTopLabel style={{ marginLeft : 10}}>원</CreateMainStyle.BodyTopLabel>
          </RowColumn>
          <RowColumn
            style={{
              height: 30
            }}/>
        </CreateMainStyle.BodyOptionColumn>
      </CreateMainStyle.Body>
      <CreateRecipeNextTouchButton
        method="button"
        marginRight={0}
        placholder="다음단계로 가볼까요?"
        iconName="chevron-right"
        onPress={()=>onHandleNext()}/>
    </CommonStyle.Container>
  )
};