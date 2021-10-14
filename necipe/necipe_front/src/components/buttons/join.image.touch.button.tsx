import React from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/Feather";
import { COLOR } from "~/Utils/color/color";
import { Image } from "react-native";

const Container = st.View`
  
`;

const TouchButton = st.TouchableOpacity`
  
`;

const IconOuterView = st.View`
border: 1px solid ${COLOR.BORDER_OUTER_COLOR};
border-radius : 60px;

padding : 5px;
`;

const TouchButtonBottomLabel = st.Text`
  margin-top : 5px;
  color : ${COLOR.FONT_COLOR};
  font-size : 14px;

  font-weight: bold;
  text-align : center;
`;

interface Props{
  iconTitle: "plus-circle";
  images: string | undefined;
  title: string;
  onPress: () => void;
};

export const JoinImageTouchButton = ({ iconTitle, title, images, onPress }: Props) => {
  return (
    <Container>
      <TouchButton
        onPress={onPress}>
        {
          images === undefined ?
            (<IconOuterView>
              <Icons name={iconTitle} size={100} color={COLOR.BORDER_OUTER_COLOR}/>
            </IconOuterView>)
            :
            (<Image
              style={{
                width: 100,
                height: 100,
                borderRadius : 50
              }}
              source={{
                  uri: images
              }}/>)  
        }
      </TouchButton>
      <TouchButtonBottomLabel>{title}</TouchButtonBottomLabel>
    </Container>
  );
};
