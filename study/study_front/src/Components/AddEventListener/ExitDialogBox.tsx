import React from "react";
import Dialog from "react-native-dialog";
import {Fonts} from '~/Library/Fonts';
import st from "styled-components/native";

interface Props{
    onPressCancle:()=>void;
    onPressExit:()=>void;
}

const Column = st.View`
    flex-direction : row;
    justify-content : space-around;
    align-items : center;
`;


const ExitDialogBox = ({onPressCancle, onPressExit}: Props)=>{
    return(
        <Dialog.Container visible={true}>
            <Dialog.Title style={{fontFamily: Fonts.bold, textAlign: "center"}}>{"잠깐!"}</Dialog.Title>
            <Dialog.Description style={{fontFamily : Fonts.medium, textAlign : "center"}}>
                {"앱이 종료되도 괜찮을까요?"}
            </Dialog.Description>
            <Column>
                <Dialog.Button style={{fontFamily : Fonts.bold, textAlign : "center"}} label="취소하기" onPress={onPressCancle}/>
                <Dialog.Button style={{fontFamily : Fonts.bold, textAlign : "center"}} label="종료하기" onPress={onPressExit}/>
            </Column>
        </Dialog.Container>
    )
};

export default ExitDialogBox;