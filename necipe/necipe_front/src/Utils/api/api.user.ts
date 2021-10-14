import AsyncStorage from "@react-native-async-storage/async-storage";
import apiConnect from "./apiConnect";

export const getUserId = async (): Promise<{}> => {
  try {
    let userInfo : string | null= await AsyncStorage.getItem("userInfo");
    return (JSON.parse(userInfo as string));
  } catch (e) {
    return {};
  }
}

export const apiUser = async ({ private_id, user_id, limit, offset }): Promise<any> => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: private_id,
          user_id: user_id,
          limit: limit,
          offset : offset
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).user}`, settings);

    if (res.status === 202) {
      throw "네트워크 상태가 올바르지 않습니다";
    };

    const { result } = await res.json();
    return result;
  } catch (e) {
    console.error(e);
  };
};