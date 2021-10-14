import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { Alert, BackHandler, ToastAndroid } from "react-native";
import ReviewDialog from "~/Components/Admin/ReviewDialog";
import ServiceLoading from "~/Components/LoadingView/ServiceLoading";
import Style from "./Style";

interface Props{
    navigation : any;
}

const Community= ({navigation} : Props) =>{
    const [modal, setModal] = useState<boolean>(false);

    useFocusEffect(
        useCallback(()=>{
            const onBackPress=()=>{
                navigation.navigate("Home");
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress',onBackPress);

            return()=>{
                BackHandler.removeEventListener('hardwareBackPress',onBackPress);
            }
        },[]),
    );

    const ReviewExit = () =>{
        setModal(false);

        ToastAndroid.showWithGravityAndOffset(
            '리뷰해 주셔서 감사합니다!!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            1,
            30
        );
    }

    return(
        <Style.Container>
            {
                modal && <ReviewDialog
                                onPress={()=>ReviewExit()}/>
            }
            <ServiceLoading 
                title="통계"
                onBackPress={()=>navigation.navigate("Home")}
                onBannerPress={()=>setModal(true)}/>
        </Style.Container>
    );
};

export default Community;