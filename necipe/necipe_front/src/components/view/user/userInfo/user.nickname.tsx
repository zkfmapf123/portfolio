import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import { getUserId } from "~/Utils/api/api.user";
import { COLOR } from "~/Utils/color/color";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.View`
  flex : 1;
  justify-content : center;
  align-items: center;
`;

const NicknameLabel = st.Text`
  font-size: 15px;
  color : ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.nexonMedium};
  font-weight : bold;
  margin-bottom : 5px;
`;

const InvitedLabel = st.Text`
  font-size :12px;
  color : ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.nexonMedium};
  background-color : ${COLOR.NOT_FOCUESD_COLOR};
  padding : 5px 15px;
  border-radius : 25px;
`;

const TouchButton = st.TouchableOpacity``;

interface Props{
  nickname: string;
  isFriend : boolean
}

export const UserNickname = ({ nickname, isFriend }: Props) => {
  const [userId, setUserId] = useState<number>();

  console.log(isFriend);

  // 유저 아이디 가져오기
  const getUserIdReturnNumber = async () : Promise<number>=> {
    if (userId === undefined) {
      const userInfo = await getUserId();
      const {privateId} = userInfo;
      setUserId(privateId as number);
      return privateId;
    };

    return userId;
  }
  
  // 초대하기
  const onHandleFriendRequest = async() => {  
    const uid = await getUserIdReturnNumber();
    
    // setIsFriendRequest(true);
  };

  // 연결끊기
  const onHandleFriendReject = async() => {
    const uid = await getUserIdReturnNumber();
    
    // setIsFriendRequest(false);
  };

  return (
    <Container>
      <NicknameLabel>{nickname}님</NicknameLabel>
      {
        isFriend == true ?
          (<TouchButton onPress={() => onHandleFriendReject()}>
              <InvitedLabel>연결끊기</InvitedLabel>
           </TouchButton>)
          :
          (<TouchButton onPress={() => onHandleFriendRequest()}>
            <InvitedLabel>초대하기</InvitedLabel>
          </TouchButton>)
      }
    </Container>
  );
};