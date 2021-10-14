import React, { useEffect, useRef, useState } from "react";
import st from "styled-components/native";
import Icons from "react-native-vector-icons/Ionicons";
import { COLOR } from "~/Utils/color/color";
import { from } from "rxjs";
import { map} from "rxjs/operators";
import { FONTS } from "~/Utils/common/fonts";

const Container = st.View`
  margin : 10px;
  flex-direction : row;
  align-items: center;

  background-color : ${COLOR.NOT_FOCUESD_COLOR};
  border-radius : 15px;
`;

const InputText = st.TextInput`
  flex : 2;
  font-size: 13px;
  color : ${COLOR.FOCUESED_COLOR};
  font-family : ${FONTS.nexonRegular};
`;

const CloseTouchButton = st.TouchableOpacity``;

const IconsView = st.View`
  flex-direction : row;
`;

interface Props{
  placeholder: string;
  onCurorInputPress: () => void;
  onSubmitText: (searchingHashtag: string) => void;
  onCompleteSubmit: () => void;
}
const numberObservable = from([1, 2, 3, 4, 5]);

export const SearchInputText = ({ placeholder,onCompleteSubmit,onCurorInputPress, onSubmitText }: Props) => {
  const [search, setSearch] = useState<string>("");
  const blurInput = useRef();

  const squreNumbers = numberObservable.pipe(
    map(val => val * val)
  );

  const onHandleSearch = (text : string) => {
    setSearch(text);
    onSubmitText(text);
  }

  const onBour = () => {
    blurInput.current.blur();
    setSearch("");
    onSubmitText("");
  }
  
  return (
    <Container>
      {/*검색 아이콘 */}
      <Icons
        style={{
          width: 50,
          textAlign : "center"
        }}  
        name="search"
        size={20}
        color={COLOR.FOCUESED_COLOR} />
      {/* 검색 부분 */}
      <InputText
        placeholder={placeholder}
        onFocus={onCurorInputPress}
        value={search}
        ref={blurInput}
        onChangeText={(text) => onHandleSearch(text)} />
      {/* 검색 실행 시, 초기화 버튼 */}
      {
        search !== "" && (
          <IconsView>
            <CloseTouchButton onPress={onCompleteSubmit}>
            <Icons
              style={{
                width: 50,
                textAlign: "center"
              }}
              name="checkmark-sharp"
              size={20}
              color={COLOR.FONT_COLOR} />

            </CloseTouchButton>
          <CloseTouchButton onPress={() => onBour()}>
            <Icons
              style={{
                width: 50,
                textAlign: "center"
              }}
              name="close"
              size={20}
              color={COLOR.FONT_COLOR} />
          </CloseTouchButton>

          </IconsView>
        )
      }
    </Container>    
  );
};