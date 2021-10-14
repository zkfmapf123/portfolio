import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import st from "styled-components/native";
import { COLOR } from "~/Utils/color/color";
import { LevelLabel } from "./level.label";

const Container = st.View`
  flex : 1;
  flex-direction : column;
`;

const HeaderView = st.View`
  flex : 1;
  flex-direction : row;
  justify-content : center;
  align-items: center;
`;

const TitleLabel = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
  font-weight : bold;
  font-size : 22px;
  letter-spacing : 1px;

  margin-right : 10px;
`;

const CategoryLabelView = st.View`
border: 1px solid ${COLOR.FOCUESED_COLOR};
background-color :${COLOR.FOCUESED_COLOR};
border-radius : 40px;
`;

const CategoryLabel = st.Text`
  color : white;
  font-size : 7px;
  padding : 5px;
  margin : auto;
`;

const MainView = st.View`
  flex: 1;
  flex-direction : row;
  justify-content : space-around;

  margin : 0px 20px;
`;

const MainColumn = st.View`
  flex-direction : column;
  align-items: center;
`;

const DocLabel = st.Text`
  color : ${COLOR.FOCUESED_COLOR};
`;
const TimeAndCostLabel = st.Text`
  margin :0px auto;
  font-weight : bold;
  color : ${COLOR.FOCUESED_COLOR};    
`;

const LevelCirCleView = st.View`
  flex-direction : row;
`;

interface Props{
  title: string;
  category: string;
  time: number;
  cost: string;
  level: boolean[];
};

export const RecipeDefaultHeaderLabel = ({ title, category, time, cost, level }: Props) => {

  return (
    <Container>
      <HeaderView>
        <TitleLabel>{title}</TitleLabel>
        <CategoryLabelView>
          <CategoryLabel>{category}</CategoryLabel>
        </CategoryLabelView>
      </HeaderView>
      <MainView>
        {/* 조리시간 */}
        <MainColumn>
          <DocLabel>조리시간</DocLabel>
          <TimeAndCostLabel>{time} 분</TimeAndCostLabel>
        </MainColumn>
        {/* 재료비용 */}
        <MainColumn>
          <DocLabel>재료비용</DocLabel>
          <TimeAndCostLabel>{cost} 원</TimeAndCostLabel>
        </MainColumn>
        {/* 난이도 */}
        <MainColumn>
          <DocLabel>난이도</DocLabel>
          <LevelCirCleView>
            {
              level.map((item, index) => {
                return <LevelLabel key={index} isLevel={item}/>
              })            
            }
          </LevelCirCleView>
        </MainColumn>
      </MainView>
    </Container>
  );
};
