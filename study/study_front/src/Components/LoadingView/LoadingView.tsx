import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import { Color } from "~/Library/Color";
import { Fonts } from "~/Library/Fonts";
import useStore from "~/userStore";

const Container =st.View`
    flex : 1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;
const MainColumn = st.View`
    flex  :2;
    justify-content : flex-end;
    text-align: center; 
    align-items : center;
    margin-bottom : 40px;
`;
const ProverbColumn = st.View`
    flex : 1;
    justify-content : flex-start;
    align-items : center;
`;
const TitleColumn = st.Text`
    font-size :18px;
    font-family :${Fonts.bold};
    color : ${Color.CAL_TITLE_TEXT_COLOR};
    margin-bottom : 20px;
`;
const DescriptionColumn = st.Text`
    font-size : 15px;
    text-align: center;
    font-family :${Fonts.medium};
    color : ${Color.TODAY_TEXT_COLOR};
    padding : 0px 20px;
    line-height : 25px;
`;

const Images = st.Image``;

interface Props{
    url : any;
}

const LoadingView = ({url} : Props) =>{
    const [author, setAuthor] = useState<string>();
    const [desc, setDesc] = useState<string>();
    const {Proverb} = useStore();

    useEffect(()=>{
        const idx = Proverb.getRandomNumber();
        const {title, description} = Proverb.getRandomProverb(idx);
        setAuthor(title);
        setDesc(description);
    },[]);
    
    return(
        <Container>
            <MainColumn>
                <Images source={url}/>
            </MainColumn>
            <ProverbColumn>
                <TitleColumn>{author}</TitleColumn>
                <DescriptionColumn numberOfLines={3}>{desc}</DescriptionColumn>
            </ProverbColumn>
        </Container>
    );
};

export default LoadingView;