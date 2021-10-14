import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import { RecipeImage } from "~/components/images/download.recipe.image";
import { InputTextCommon } from "~/components/inputText/InputText.comment";
import { CommentList } from "~/components/list/comment.list";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_WIDTH } from "~/Utils/common/common";

const Container = st.View`
  flex : 1;
  margin : auto 10px;
  width : ${DEVISE_WIDTH / 1.2}PX;
  height : 100%;
  background-color : ${COLOR.RECIPE_INNER_BACKGROUND_COLOR};
  border: 2px solid ${COLOR.RECIPE_OUTER_BORDER_COLOR};
`;

const ImageColumn = st.View`
  flex : 1;
`;

const CommentColumn = st.View`
  margin : 0 10px 10px 10px;
  flex : 1.5;
`;

const ReadColumn = st.View`
  flex : 1;
`;

interface Props{
  recipeId: number;
  privateUserId: number;
  nickname: string;
  width: number;
  url: string | undefined;
}

// 댓글 redux-thunk
export const LastRecipe = ({recipeId,privateUserId, nickname, url, width }: Props) => {
  const [mount, setMount] = useState<boolean>(false);

  const [commentVisible, setCommentVisible] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");;

  const [questionNickname, setQuestionNickname] = useState<string>("");
  const [questinoRid, setQuestionRid] = useState<number>(0);

  // 댓글 달기
  const commentVisibleFunc = (nickname: string) => {
    setCommentVisible(!commentVisible);
    setQuestionNickname(nickname);
  };

  return (
    <Container>
      {/* 이미지 */}
      <ImageColumn>
       <RecipeImage style={{
          width: width - 5,
          height: `100%`,
          marginLeft: "auto",
          marginRight : "auto",}}
          url={url}/>
      </ImageColumn>
      {/* 코맨트 + 댓글*/}
      <CommentColumn>
        <CommentList
          width={DEVISE_WIDTH / 1.2}
          privateId={privateUserId}
          nickname={nickname}
          recipeId={recipeId}/>
      </CommentColumn>
    </Container>
  )
}


