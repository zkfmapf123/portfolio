import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
import DrawerTextButton from "~/Components/DrawerTextButton";
import TopShortBorder from "~/Components/TopShortBorder";
import useStore from "~/userStore";
import Style from "./Style";

interface Props{
    navigation : any;
}

const DrawerContent = ({navigation} : Props) =>{

    const {MyInfo} = useStore();

    if(MyInfo.getNickname() === " "){
        return(
            <Style.EmptyContainer>
                <Style.ToastLabel>로그인이 필요합니다</Style.ToastLabel>
            </Style.EmptyContainer>
        )
    }else{
        return(
            <Style.Container>
                <Style.Header>
                <TopShortBorder/>
                <Style.HeaderTopLabel>오늘의 다짐</Style.HeaderTopLabel>
                <Style.HeaderProverLabel>{MyInfo.getProverb()}</Style.HeaderProverLabel>
            </Style.Header>
            <Style.Main>
                <Style.DrawerColumn>
                    <Style.MainLabel>Personal</Style.MainLabel>
                    <DrawerTextButton title="내 정보" onPress={()=>navigation.dispatch(CommonActions.navigate("Profile"))}/>
                    <DrawerTextButton title="플래너" onPress={()=>navigation.navigate("Home")}/>
                    <DrawerTextButton title="시간체크" onPress={()=>navigation.dispatch(CommonActions.navigate("TimeCheck"))}/>
                    <DrawerTextButton title="내 통계" onPress={()=>navigation.dispatch(CommonActions.navigate("Statistic"))}/>
                </Style.DrawerColumn>
                <Style.DrawerColumn>
                    <Style.MainLabel>Community</Style.MainLabel>
                    <DrawerTextButton title="커뮤니티" onPress={()=>navigation.dispatch(CommonActions.navigate("Community"))}/>
                </Style.DrawerColumn>
            </Style.Main>
            </Style.Container>
        )
    }
};

export default DrawerContent;