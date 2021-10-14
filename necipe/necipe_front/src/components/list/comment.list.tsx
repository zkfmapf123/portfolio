import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import st from "styled-components/native";
import { apiGetComment } from "~/Utils/api/api.comment";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_WIDTH } from "~/Utils/common/common";
import { InputTextCommon } from "../inputText/InputText.comment";
import CommentLabel from "../view/comment/comment.label";
import { FooterComponent } from "./recipe.list";

const Container = st.View`
`;

const SearchView = st.View``;
const CommentView = st.View``;

interface Props{
  width: number;
  privateId: number;
  nickname: string;
  recipeId: number;
};

export type commentType = {
  id: number;
  rid: number;
  uid: number;
  nickname: number;
  refer_nickname: string;
  refer_id: number;
  bgroup: number;
  sorts: number;
  depth: number;
  created_datetime: string;
  cmt: string;
  child_comments: number;
}

export const CommentList = ({ privateId, nickname, recipeId, width}: Props) => {
  const [data, setData] = useState<commentType[]>([]);

  // paging
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [mount, setMount] = useState<boolean>(false);

  // refersh
  const handleRefresh = () => {
    if (loading) {
      setLoading(false);
      setOffset(0);
      setData([]);
      setRefreshing(true);
      setMount(!mount);
    }
  };

  // pagination
  const pagination = () => {
    
  };
  
  // 댓글 달기
  const writeComment = async() => {
    
  };

  const deleteComment = async() => {
    
  };

  useEffect(() => {
    
    (async () => {
      const { comments } = await apiGetComment({
        recipeId: recipeId,
        limit: limit,
        offset: offset
      });

      setData([...data, ...comments]);
    })();

    setTimeout(() => {
      setLoading(true);
      setRefreshing(false);
    });
  }, [mount]);

  return (
    <Container>
      {/* search */}
      <SearchView>
        <InputTextCommon
          style={{
            backgroundColor: `${COLOR.RECIPE_INNER_INNER_BACKGROUND_COLOR}`,
            marginTop: 10,
            marginBottom: 10,
            paddingLeft: 10,
            paddingRight: 10
          }}
            onEndWrite={write => console.log(write)}
            firstTitle={nickname}
            iconName="check"
            placeholder="님에게 궁금한 점을 물어보세요"/>
      </SearchView>
      {/* comment list */}
      <CommentView>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <CommentLabel
              iconName="dot-single"
              width = {width-50}
              item={item}
              containerWidth={DEVISE_WIDTH / 2}/>
          )}
          keyExtractor={(item, index) => { return String(index) }}
          ListFooterComponent={<FooterComponent loading={loading} />}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={pagination}
          onEndReachedThreshold={1}/>
      </CommentView>
    </Container>
  )
}