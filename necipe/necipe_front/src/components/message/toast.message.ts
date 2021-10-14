import { ToastAndroid } from "react-native"
import { DEVISE_HEIGHT } from "~/Utils/common/common";

type toastMessageType = {
  label: string;
  term: number;
  position: number;
  xOffset?: number;
  yOffset?: number;
};

export const ToastMessage = ({ label, term, position,xOffset = 1, yOffset = DEVISE_HEIGHT / 2.5 }: toastMessageType) => {
  
  ToastAndroid.showWithGravityAndOffset(
    `${label}`,
    term,
    position,
    xOffset,
    yOffset
  )
};
