import React from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";

const Container =st.View`
    flex : 1;
    justify-content : center;
    align-items: center;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;

const Images = st.Image``;

const MainLoading = () =>{
    return(
        <Container>
            <Images source={require("~/Assets/mainLoading.gif")}/>
        </Container>
    );
};

export default MainLoading;
