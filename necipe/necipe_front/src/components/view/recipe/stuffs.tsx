import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import st from "styled-components/native";
import { SimpleLoadingView } from "~/components/Loading/Loading";
import { COLOR } from "~/Utils/color/color";

const Container = st.View`
  flex : 1;
  flex-direction : row;
  align-items: center;
  margin : 0 auto;
`;

const StuffTitleLabel = st.Text`
  width : 40px;
`;

const StuffLabel = st.Text`
  flex : 1;
  background-color : ${COLOR.RECIPE_INNER_INNER_BACKGROUND_COLOR};
  margin : 0px 5px;
  padding : 5px;
  border-radius : 30px;
`;

interface Props{
  width: number;
  stuffs: string;
}

export const Stuffs = ({ width, stuffs }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stuffArr, setStuffArr] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

    // string to arr
    if (stuffs === "") {
      setStuffArr(["없음"]);
    } else {
      const stuffFormating : string[] = stuffs.split("&&");
      setStuffArr(stuffFormating.splice(0, stuffFormating.length - 1));
    }

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  if (loading) {
    return (
      <Container
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width : width
        }}>
          <SimpleLoadingView/>
      </Container>)
  } else {
    return (
      <Container
        style={{
          width: width
        }}>
        <StuffTitleLabel>재료</StuffTitleLabel>
        <ScrollView horizontal={true}>
          {
              (stuffArr.map((item, index) => {
                return (
                  <StuffLabel key={index}>{item}</StuffLabel>
                )
              }))
          }
        </ScrollView>
      </Container>
    ); 
  }
};