import React, { useState } from "react";
import Dialog from 'react-native-dialog';
import {Fonts} from '~/Library/Fonts';
import st from 'styled-components/native';
import AsyncStorage from "@react-native-community/async-storage";
import { SERVER_API } from "~/Library/Const";
import { Color } from "~/Library/Color";

interface Props{
    onPress:()=>void;
}

const Header = st.View`
    margin-bottom : 30px;
`;

const Main = st.View`
    margin-bottom : 30px;

    justify-content : center;
    align-items: center;
`;

const MainTitleLabel = st.Text`
    text-align:center;
    margin-bottom : 15px;
    
    font-size : 15px;
    font-family: ${Fonts.medium};
    color : ${Color.TODAY_TEXT_COLOR};
    
`;
const MainTextColumn = st.View`
    border: 1px solid ${Color.TODAY_TEXT_COLOR};
    border-radius : 20px;
    width: 250px;
    height : 200px;
`;

const ButtonColumn = st.View`
    flex-direction : row;   
    justify-content : space-around;
    align-items: center;
`;

const Footer = st.View`
`;

const InputText= st.TextInput`
    flex : 1;
`;

const ReviewDialog = ({onPress}: Props) =>{

    const [select ,setSelect] = useState<boolean>(true);
    const [selectText, setSelectText] = useState<string>(" ");
    const [review, setReview] = useState<string>("");

    const selectReview = (text : string) =>{
        setSelectText(text);
        setSelect(false);
    }

    const writeReview = async() =>{
        try{
            const userId = await AsyncStorage.getItem("userId");
            const setting = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: `${userId}`,
                    separate : `${selectText}`,
                    content: `${review}`
                })
            };

            await fetch(`${SERVER_API}/admin/review`,setting);
            onPress();
        }catch(e){
            console.error(e);
        }
    }

    return(
        <Dialog.Container visible={true}>
            <Header>
                <Dialog.Title style={{fontFamily: Fonts.bold, textAlign: "center"}}>Review</Dialog.Title>
            </Header>
                {
                    select ?
                    (<Main>
                        <Dialog.Button 
                            style={{fontFamily: Fonts.bold, textAlign: "center"}}
                            onPress={()=>selectReview("아이디어/공유")}
                            label="아이디어/공유"/>
                        <Dialog.Button 
                            style={{fontFamily: Fonts.bold, textAlign: "center"}}
                            onPress={()=>selectReview("평가/리뷰")}
                            label="평가/리뷰"/>
                        <Dialog.Button 
                            style={{fontFamily: Fonts.bold, textAlign: "center"}}
                            onPress={()=>selectReview("하고싶은 말")}
                            label="하고싶은 말"/>
                     </Main>)
                    :
                    (<Main>
                        <MainTitleLabel>{selectText}</MainTitleLabel>
                        <MainTextColumn>
                            <InputText
                                multiline={true}
                                numberOfLines={7}
                                textAlign="center"
                                placeholder="리뷰를 작성해주세요"
                                onChangeText={text => setReview(text)}
                                keyboardType='twitter'
                                style={{
                                    fontWeight: "bold",
                                    fontFamily: `${Fonts.medium}`,
                                    color: `${Color.TODAY_TEXT_COLOR}`}}
                                value={review}/>
                        </MainTextColumn>
                    </Main>)
                }
            <Footer>
                {
                    review === "" ?
                    (<ButtonColumn>
                        <Dialog.Button 
                            style={{fontFamily: Fonts.bold, textAlign: "center"}}
                            onPress={onPress}
                            label="나가기"/>
                    </ButtonColumn>)
                    :
                    (<ButtonColumn>
                        <Dialog.Button 
                            style={{fontFamily: Fonts.bold, textAlign: "center"}}
                            onPress={onPress}
                            label="나가기"/>
                        <Dialog.Button 
                            style={{fontFamily: Fonts.bold, textAlign: "center"}}
                            onPress={()=>writeReview()}
                            label="리뷰 작성하기"/>
                    </ButtonColumn>)
                }
            </Footer>
        </Dialog.Container>
    );
};

export default ReviewDialog;