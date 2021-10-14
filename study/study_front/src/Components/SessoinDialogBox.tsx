import React from "react";
import Dialog from "react-native-dialog";
import { Fonts } from "~/Library/Fonts";

interface Props{
    title : string;
    emailDescription : string;
    nameDescriptoin : string;
    passwordDescirption : string;
    passwordDescription2 : string;
    onPress :() => void;
}

const SessoinDialogBox = ({title,emailDescription, nameDescriptoin,passwordDescirption, passwordDescription2,onPress}:Props) =>{
    return(
        <Dialog.Container visible={true}>
            <Dialog.Title style={{fontFamily : Fonts.bold, textAlign : "center"}}>{title}</Dialog.Title>
            <Dialog.Description style={{fontFamily : Fonts.medium, fontSize:12}}>
                {emailDescription}
            </Dialog.Description>
            <Dialog.Description style={{fontFamily : Fonts.medium, fontSize:12}}>
                {nameDescriptoin}
            </Dialog.Description>
            <Dialog.Description style={{fontFamily : Fonts.medium, fontSize:12}}>
                {passwordDescirption}
            </Dialog.Description>
            <Dialog.Description style={{fontFamily : Fonts.medium, fontSize:12}}>
                {passwordDescription2}
            </Dialog.Description>
            <Dialog.Button style={{fontFamily : Fonts.bold, textAlign : "center"}} label="확인" onPress={onPress}/>
        </Dialog.Container>
    );
};

export default SessoinDialogBox;