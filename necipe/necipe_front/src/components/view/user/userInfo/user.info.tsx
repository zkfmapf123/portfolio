import React, { useEffect } from "react";
import st from "styled-components/native";
import { RecipeImage } from "~/components/images/download.recipe.image";
import { COLOR } from "~/Utils/color/color";
import { userInfoType } from "~/Utils/types/dto.type";
import { UserCount } from "./user.count";
import { UserImage } from "./user.image";
import { UserNickname } from "./user.nickname";

const Container = st.View`
  flex : 1;
  flex-direction : row;
`;

const Column = st.View`
  flex : 1;
`;

const ImageColumn = st.View`
width: 80px;
height: 80px;
border-radius : 40px;
margin : auto
`;


const EmptyImageView = st.View`
  border: 1px solid ${COLOR.FOCUESED_COLOR};
  width : 80px;
  height : 80px;
  border-radius : 40px;
`;


interface Props{
  userInfo: userInfoType;
}

export const UserInfo = ({ userInfo }: Props) => {

  const { id, image_url, nickname, is_friend, total_friends, total_recipes } = userInfo;

  return (
    <Container>
      {/** image */}
      <Column style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginTop: "auto",
        marginBottom: "auto"
      }} >
        <ImageColumn>
          <RecipeImage
            style={{
            width: 80,
            height: 80,
            borderRadius: 40}}
            url={image_url}
            fileName="users"/>
        </ImageColumn>
      </Column>
      {/** nickname + friend request */}
      <Column>
        <UserNickname nickname={nickname} isFriend={is_friend}/>
      </Column> 
      {/** guest */}
      <Column>
        <UserCount guestNumber={total_friends} placholder="게스트"/>
      </Column>
      {/** article */}
      <Column>
        <UserCount guestNumber={total_recipes} placholder="게시글"/>
      </Column>
    </Container>
  );
};