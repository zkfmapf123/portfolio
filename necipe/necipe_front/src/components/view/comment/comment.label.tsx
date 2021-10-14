import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/Entypo";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { View } from "react-native";
import { InputTextCommon } from "~/components/inputText/InputText.comment";
import { commentType } from "~/components/list/comment.list";

const TopContainer = st.View`
  flex-direction : column;
`;

const Container = st.View`
  margin : 5px auto;
  flex-direction : row;
`;

// container기준 왼쪽 column
const LeftColumn = st.View`
  margin-right : 3px;
`;

// leftColumn > first column(nickname)
const NickNameColumn = st.View`
  flex : 1;
  flex-direction : row;
  align-items: center;
`;

// leftColumn > secound column & third column
const BottomColumn= st.View`
  flex : 1;
  flex-direction :row;
  justify-content : center;
  align-items: center;
`;

// rightColumn
const RightColumn = st.View`
  margin-left : 3px;
`;

const RightColumnLabel = st.Text`
  padding : 2px;
  font-size :12px;
`;

const Label = st.Text``;
const TouchButton = st.TouchableOpacity``;

interface Props{
  width: number;
  iconName: "dot-single";
  containerWidth: number;
  item: commentType;
};

const CommentLabel = ({ width, iconName = "dot-single", containerWidth, item }: Props) => {

  // dispatch로 부르고 거기서 불러온다.

  const { bgroup, cmt, created_datetime, depth, id, nickname, refer_id, refer_nickname, rid, sorts, uid, child_comments } = item;

  // 4 : 6 비율
  const LEFT_LABEL_WIDTH = width * 0.4;
  const RIGHT_LABEL_WIDTH = width * 0.6;
  const RIGHT_LABEL_MARGIN_WIDTH = width * 0.5;

  const [formatTime, setFormatTime] = useState<string>("오늘");
  const [visibleButton, setVisibleButton] = useState<boolean>(false);
  const [txt, setTxt] = useState<string>("답글달기");

  const [topContainerHeight, setTopContainerHeight] = useState<number>(70);

  // 코맨트 날짜 and 시간 구하기
  const getArticleDate = () => {
    const foramtArticleDate = item.created_datetime.split("T");
    const ymd = foramtArticleDate[0].replace("/\-/", ".");
    
    const formatArticleHms = foramtArticleDate[1].split(":");
    const h = `${formatArticleHms[0]}`;
  
    return { ymd, h };
  };
  
  // 현재 날짜 and 시간 구하기
  const getCurrentData = () => {
    const currntData = new Date();
    const year = currntData.getFullYear();
    let month = (currntData.getMonth() + 1) === 13 ? `${1}` : `${currntData.getMonth() + 1}`;
    const date = (currntData.getDate() < 10) ? `0${currntData.getDate()}` : `${currntData.getDate()}`;
  
    if (+month < 10) {
      month = `0${month}`;
    };
    
    const cymd = `${year}.${month}.${date}`;
  
    const ch = currntData.getHours() < 10 ? `0${currntData.getHours()}` : `${currntData.getHours()}`;
  
    return { cymd, ch };
  };

  // 시간 계산 하기
  const calculatorTime = () => {
    const { ymd, h} = getArticleDate();
    const { cymd, ch } = getCurrentData();
    
    if (ymd === cymd) {
      
      setFormatTime(`${(+ch) - (+h)}간 전`);
      return;
    }

    setFormatTime(`${ymd}`);
    return;
  }

  // 답글 달기 버튼 동작하기
  const beforeCreateCommentChildButton = () => {
    setVisibleButton(!visibleButton);

    if (txt === "답글달기") {
      setTxt("답글접기");
      //setTopContainerHeight(100);
      return;
    };

    setTxt("답글달기");
    //setTopContainerHeight(50);
    return;
  };

  useEffect(() => {

    calculatorTime();
  }, []);

  
  return (
    <TopContainer>
    <Container style={{
      width : width,
      height: topContainerHeight
    }}>
      {/* 이름, 답글달기, 시간, 댓글보기, bottomTab */}
      <LeftColumn
        style={{
          width : LEFT_LABEL_WIDTH
        }}>
        {/* 닉네임 */}
        <NickNameColumn>
          <Icons name={iconName}/>
          <Label style={{
            marginLeft: "auto",
            marginRight : "auto"
          }}>{nickname}님</Label>
        </NickNameColumn>
        {/* 답글달기 & 시간 */}
        <BottomColumn>
          <Label>{formatTime}</Label>
          <TouchButton onPress={()=>beforeCreateCommentChildButton()}>
            <Label>{txt}</Label>
          </TouchButton>
        </BottomColumn>
        {/* 댓글보기  */}
        {
          child_comments !== 0 &&
          (<BottomColumn>
            <TouchButton onPress={() => console.log("댓글보기")}>
              <Label>댓글 보기 {child_comments}개</Label>
            </TouchButton>
            <Icons name="triangle-down"/>
          </BottomColumn>)  
        }
      </LeftColumn>
      {/* comemnt */}
      <RightColumn
        style={{
          width: RIGHT_LABEL_WIDTH,
        }}>
        <ScrollView
          horizontal={false}>
          <RightColumnLabel numberOfLines={10}>{cmt}</RightColumnLabel>
        </ScrollView>
      </RightColumn>
      </Container>
      {
        txt === "답글접기" &&
        <InputTextCommon
          firstTitle={nickname}
          iconName="check"
          placeholder="님에게 궁금한 점을 물어보세요"/>
      }
    </TopContainer>
  )
};

export default React.memo(CommentLabel);