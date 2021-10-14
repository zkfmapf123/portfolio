import React from "react";
import st from "styled-components/native";
import Dialog from "react-native-dialog";

interface Props{
  title: string;
  description: string;
  onCancle: () => void;
  onExit: () => void;
}

export const ExitQuestionModal = ({ title, description, onCancle, onExit }: Props) => {
  return (
    <Dialog.Container visible={true}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      <Dialog.Button onPress={onCancle} label="취소하기" />
      <Dialog.Button onPress={onExit} label="종료하기" />
    </Dialog.Container>
  );
};