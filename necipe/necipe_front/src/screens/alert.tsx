import React, { useCallback, useEffect, useState } from "react";
import CommonStyle from "~/styles/common";
import AlertStyle from "~/styles/alert/alert";
import { BackPressButton } from "~/components/buttons/back.press.button";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigationTypes } from "~/Utils/types/navigation.type";
import { AlertMoveLable } from "~/components/buttons/alert.move.button";
import { COLOR } from "~/Utils/color/color";
import { useDispatch, useSelector } from "react-redux";
import { getAlertItems } from "~/modules/reducer/alert.reducer";
import { ScrollView } from "react-native-gesture-handler";
import { AlertFriendTouchButton } from "~/components/view/alert/alert.friends";
import { ToastMessage } from "~/components/message/toast.message";
import { ToastAndroid } from "react-native";
import { DEVISE_HEIGHT } from "~/Utils/common/common";
import { CommonActions } from "@react-navigation/native";

interface Props{
  navigation: StackNavigationProp<StackNavigationTypes, "Alert">;
}

type friendType = {
  uid: number;
  fid: number;
  created_datetime: string;
};

type logType = {
  id: number;
  comment: string;
  created_datetime: string;
};

// redux-thunk
export const AlertView = ({ navigation}: Props) => {
  const items = useSelector((state: any) => state.alertReducer.payload);
  const privateId = useSelector((state: any) => state.commonReducer.payload);

  const dispatch = useDispatch();
  const [visibleButton, setVisibleButton] = useState<boolean[]>([true, false]);
  const [method, setMethod] = useState<"friedns" | "logs">("friedns");


  const [friends, setFriends] = useState<friendType>();
  const [logs, setLogs] = useState<logType>();
  const [mount, setMount] = useState<boolean>(false);

  // move 버튼 이동하기
  const selectButton = useCallback((type: "friend" | "comment") => {

    if (type === "friend") {
      if (visibleButton[0]) {
        return;
      };

      setMethod("friedns");
      setVisibleButton([true, false]);
      return;
    } else {
      if (visibleButton[1]) {
        return;
      }
      setMethod("logs");
      setVisibleButton([false, true]);
    };

  }, [visibleButton]);
  
  // reloading
  useEffect(() => {
    try {
      dispatch(getAlertItems({ private_id: privateId }));
    } catch (e) {
      console.error(e);
    }
  }, [mount]);

  // 수락 & 거절 
  const deleteFriendAfterMessge = () => {
    ToastMessage({
      label: `성공적으로 처리 하였습니다`,
      term: ToastAndroid.SHORT,
      position: ToastAndroid.BOTTOM,
    });

    setMount(!mount);
  };

  // 댓글 지우기
  const deleteLogAfterMessage = () => {
    
  };

  return (
    <CommonStyle.Container
      style={{
        backgroundColor : `#FFFFFF`
      }}>
      {/* header */}
      <AlertStyle.Header>
        {/* 뒤로 가기 */}
        <BackPressButton
          containerStyle={{
            flex: 1,
            flexDirection : "row",
            position: "absolute",
            alignItems : "center",
            top: 0,
            left: 0,
            marginTop: 20,
            marginLeft : 20
          }}
          iconName="left"
          placeholder="알림"
          onPress={() => navigation.goBack()}/>
        {/* 신청 , 댓글 */}
        <AlertStyle.HeaderBottomColumn>
          <AlertStyle.HeaderMoveLabelColumn
            style={{
              borderBottomColor: `${COLOR.ALERT_MOVE_BORDER_BOTTOM_NOT_VISIBLE_COLOR}`,
              borderBottomWidth: 1
            }}>
            <AlertMoveLable onPress={()=>selectButton("friend")} isVisible={visibleButton[0]} placeholder={"초대 신청"} />
            <AlertMoveLable onPress={()=>selectButton("comment")} isVisible={visibleButton[1]} placeholder={"댓글"}/>
          </AlertStyle.HeaderMoveLabelColumn>
        </AlertStyle.HeaderBottomColumn>
      </AlertStyle.Header>
      {/* main */}
      <AlertStyle.Main>
        {
          (items.friends.map((item, index) => {
            return (
              <AlertFriendTouchButton
                key={index}
                name={item.nickname}
                privateId={privateId}
                userId={item.fid}
                onDeleteFriends={() => deleteFriendAfterMessge()} />
            )
          }))
          // 댓글은 comment가 되고 해야한다.
        }
      </AlertStyle.Main>
    </CommonStyle.Container>
  );
};