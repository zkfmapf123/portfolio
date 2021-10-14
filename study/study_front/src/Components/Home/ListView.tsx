import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";

const Container = st.View`
    height : 50px;
    width : 100%;
    justify-content : center;
    align-items: center;
`;

const Label = st.Text`
    font-size : 15px;
    font-family : ${Fonts.bold};
    color : ${Color.CAL_TITLE_TEXT_COLOR};
    letter-spacing : 1px;
`;

interface Props{
    description : string;
}

const ListView = ({description} : Props)=>{
    return(
        <Container>
            <Label>{description}</Label>
        </Container>
    );
};

export default ListView;
