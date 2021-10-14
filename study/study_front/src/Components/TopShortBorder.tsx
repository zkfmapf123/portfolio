import React from "react";
import st from "styled-components/native";

const Container =st.View`
    justify-content :center;
    align-items :center;
    margin-bottom : 20px;
`;

const Label = st.Text`
    border : 1px solid gray;
    width : 50px;
    height : 0px;
`;


const TopShortBorder = () =>{
    return(
        <Container>
            <Label></Label>
        </Container>
    );    
};

export default TopShortBorder;