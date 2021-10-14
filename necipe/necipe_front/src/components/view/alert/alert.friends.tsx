import React from "react";
import st from "styled-components/native";
import { apiAccept, apiReject } from "~/Utils/api/api.alert";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  width : 90%;
  height : 70px;
  flex-direction : row;
  border: 2px solid white;
  margin : 0 auto;
`;

const Column = st.View`
  margin: auto;
  justify-content : center;
  align-items: center;
`;

const NicknameLabel = st.Text`
  color : ${COLOR.ALERT_NICKNAME_LABEL_COLOR};
`;

const LastLabel = st.Text``;

const TouchButton = st.TouchableOpacity`
  flex : 1;
  justify-content : space-around;
`;

const TouchButtonLabel = st.Text`
  margin : auto;
  padding : 5px 10px;
  border-radius : 20px;
`;

interface Props{
  privateId: number;
  userId: number;
  name: string;
  onDeleteFriends: () => void;
}

export const AlertFriendTouchButton = ({privateId, userId, name, onDeleteFriends}: Props) => {

  // 수락
  const onHandleAccept = async() => {
    try {
      await apiAccept({ privateId: privateId, userId: userId })
        .then(() => {
          onDeleteFriends();
        })
        .catch((e) => {
          throw e;
        })
    } catch (e) {
      console.error(e);
    }
  };

  // 거절
  const onHandleReject = async () => {
    try {
      await apiReject({ privateId: privateId, userId: userId })
        .then(() => {
          onDeleteFriends();
        })
        .catch((e) => {
          throw e;
        })

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      style={{
        borderBottomColor: `${COLOR.ALERT_CONTAINER_BOTTOM_COLOR}`
      }}>
      {/* text */}
      <Column
        style={{
          flex: 2,
          flexDirection: "row"
        }}>
        <NicknameLabel numberOfLines={1}>{name}</NicknameLabel>
        <LastLabel numberOfLines={1}>이 회원님을 초대했습니다</LastLabel>
      </Column>
      {/* 확인, 취소 버튼 */}
      <Column
        style={{
          flex: 1,
          flexDirection : "row"
        }}>
        <TouchButton onPress={()=>onHandleAccept()}>
          <TouchButtonLabel
            style={{
              backgroundColor: `${COLOR.ALERT_ACCEPT_BUTTON_BACKGROUND_COLOR}`,

            }}>수락</TouchButtonLabel>
        </TouchButton>
        <TouchButton onPress={()=>onHandleReject()}>
          <TouchButtonLabel
            style={{
              borderWidth: 1,
              borderStyle : "solid",
              borderColor : `${COLOR.ALERT_REJECT_BUTTON_OUTER_COLOR}`,
            }}>거절</TouchButtonLabel>
        </TouchButton>
      </Column>
    </Container>
  );
};