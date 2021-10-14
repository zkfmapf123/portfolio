import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import { RecipeImage } from "~/components/images/download.recipe.image";
import { COLOR } from "~/Utils/color/color";
import { DEVISE_WIDTH } from "~/Utils/common/common";
import { Description } from "./description";
import { ShortDescription } from "./short";
import { Stuffs } from "./stuffs";
import { Tips } from "./tips";

const Container = st.View`
  flex : 1;
  margin : auto 10px;
  width : ${DEVISE_WIDTH / 1.2}px;
  height : 100%;
  border: 2px solid ${COLOR.RECIPE_OUTER_BORDER_COLOR};
`;

const BottomColumn = st.View`
  flex: 1.5;
  background-color : ${COLOR.RECIPE_INNER_BACKGROUND_COLOR};
`;

// thumanil
const FirstColumn = st.View`
  flex : 1;
`;

// step 
const SecoundColumn = st.View`

`;

// description
const ThirdColumn = st.View`
  margin-bottom : 5px;
`;

// tips + stuffs
const FourthColumn = st.View`
  flex : 1;
`;

const FourthInnterColumn = st.View`
  flex : 1;
`;

interface Props{
  uri: string;
  shortDescription: string;
  description: string;
  tips: string;
  stuffs: string;
  stepIndex: number;
  containerWidth: number;
};

export const RecipeView = ({
  containerWidth,
  uri,
  shortDescription,
  description,
  tips,
  stuffs,
  stepIndex }: Props) => {

  return (
      <Container
      style={{
          width : containerWidth
        }}>
        {/* thumanil */}
      <FirstColumn>
        <RecipeImage
          style={{
            width: containerWidth-5 ,
            height: `100%`,
            marginLeft: "auto",
            marginRight: "auto",}}
            url={uri}/>
        </FirstColumn>
        <BottomColumn>
          {/* step */}
          <SecoundColumn>
            <ShortDescription width={containerWidth- 20 } stepIndex={stepIndex} label={shortDescription}/>
          </SecoundColumn>
          {/* description */}
          <ThirdColumn>
            <Description width={containerWidth-20 } description={description}/>
          </ThirdColumn>
          {/* tips + stuffs */}
          <FourthColumn>
            <Tips width={containerWidth-20 } tips={tips} />
            <FourthInnterColumn>
              <Stuffs width={containerWidth-20 } stuffs={stuffs}/>
            </FourthInnterColumn>
          </FourthColumn>
        </BottomColumn>
    </Container>
  )
};