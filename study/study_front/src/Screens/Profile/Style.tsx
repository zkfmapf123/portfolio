import st from "styled-components/native";
import { Color } from "~/Library/Color";

const Container = st.SafeAreaView`
    flex :1;
    background-color : ${Color.ENTIRE_BACKGROUND_COLOR};
`;

export default {
    Container,
}
