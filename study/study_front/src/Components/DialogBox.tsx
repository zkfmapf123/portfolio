import React from "react";
import Dialog from "react-native-dialog";
import { Fonts } from "~/Library/Fonts";

interface Props{
    title : string;
    descriptoin : string;
    onPress :() => void;
}

const DialogBox = ({title,descriptoin,onPress}:Props) =>{
    return(
        <Dialog.Container visible={true}>
            <Dialog.Title style={{fontFamily : Fonts.bold, textAlign : "center"}}>{title}</Dialog.Title>
            <Dialog.Description style={{fontFamily : Fonts.medium, textAlign : "center"}}>
                {descriptoin}
            </Dialog.Description>
            <Dialog.Button style={{fontFamily : Fonts.bold, textAlign : "center"}} label="확인" onPress={onPress}/>
        </Dialog.Container>
    );
};

export default DialogBox;