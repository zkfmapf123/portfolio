import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Label = st.Text`
    font-size : 25px;
    font-family: ${Fonts.bold};
    padding : 15px 10px 10px 10px;
    border-radius : 15px;
    letter-spacing : 2px;
    width : 60%;
    text-align :center;
    color : white;
    
    margin-top: 10px;
    margin-bottom : 15px;
`;

interface Props{
    title : string;
}

const TitleLabel = ({title} : Props)=>{
    return(
        <Label>{title}</Label>
    )   
};

export default TitleLabel;