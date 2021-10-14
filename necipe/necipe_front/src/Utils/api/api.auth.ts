import AsyncStorage from "@react-native-async-storage/async-storage";
import KakaoOAuthToken, { login,getAccessToken, unlink, getProfile, KakaoProfile, KakaoAccessTokenInfo } from "@react-native-seoul/kakao-login";
import { apiUser } from "./api.user";
import apiConnect from "./apiConnect";

export type kakaoUserInfoType = {
  userPirvateId: string | undefined;
  userAccessToken: string | undefined;
  userAccessTokenExpiredInDate: string;
}

export type saveUserType = {
  privateId: string | number;
  accessToken: string;
  expiredInDate: string;
};

// 유저 가입하기
module loginKakao {
  
  const getMyKakaoProfile = async (): Promise<KakaoProfile | null> => {
    try {
      const userInfo = await getProfile();

      return userInfo;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getKakaoAccessToken = async (): Promise<KakaoAccessTokenInfo> => {
    try {
      const userToken = await getAccessToken();

      return userToken;
    } catch (e) {
      throw e;
    }
  };

  const createExpiredInDate = (): string => {
    const today = new Date();
    let todayYear : string | number = today.getFullYear();
    let todayMonth : string | number = today.getMonth() === 12 ? 1 : today.getMonth() + 1;
    let todayDate: string | number = today.getDate();
    
    todayMonth += 3;
    if (todayMonth > 12) {
      todayYear += 1;
      todayMonth = (todayMonth - 12);
    };
    
    if (todayMonth < 10) todayMonth = `0${todayMonth}`;
    if (todayDate < 10) todayDate = `0${todayDate}`;

    return `${todayYear}${todayMonth}${todayDate}`;
  }

  export const accessKakaoLogin = async (): Promise<kakaoUserInfoType | null> => {
    try {
      await login();

      const userInfo: KakaoProfile | null = await getMyKakaoProfile();
      const userToken: KakaoAccessTokenInfo | null = await getKakaoAccessToken();
      
      if (userInfo === null) {
        return null;
      };
      
      // userInfo.id

      const userPirvateId : string | undefined = userInfo?.id;
      const userAccessToken : string | undefined = userToken?.accessToken;
      const userAccessTokenExpiredInDate : string = createExpiredInDate();

      return { userPirvateId, userAccessToken, userAccessTokenExpiredInDate };

    } catch (e) {
      console.error(e);
      return null;
    }
  }
};

// 나의 유저정보를 가져오기
export const getMyProfile = async (): Promise<string | null | undefined> => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo")
      .catch((e) => {
        throw new Error(e)
      });
    
    return userInfo;
  } catch (e) {
    return null;
  }
};

// 카카오 로그인
export const kakaoLogin = async () => {
  try {
    const userInfo: kakaoUserInfoType | null = await loginKakao.accessKakaoLogin();
    return userInfo;
  } catch (e) {
    return null;
  }
};

//카카오 로그아웃
export const kakaoLogout = async () => {
  await unlink();
};

// api auth
export const apiUserRegister = async ({privateId,imageUrl,method, os, nickname}) : Promise<[boolean, number | undefined]> => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
          image_url: imageUrl,
          email: "",
          nickname: nickname,
          method: method,
          os:os
        }
      })
    };
    
    const res = await fetch(`${apiConnect(__DEV__).auth}`, settings);
    const result = await res.json();

    if (res.status === 200) {
      return [true, result.result.id];
    };

    return [false, undefined];
  } catch (e) {
    console.error(e);
    return [false, undefined];
  }
};

export const apiUserValidation = async (privateId : string | number): Promise<number | undefined> => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
        }
      })
    };
    
    const res = await fetch(`${apiConnect(__DEV__).authValidation}`, settings);
    
    if (res.status === 200) {
      const {result} = await res.json();
      return result;
    };

    return undefined;
  } catch (e) {
    console.error(e);
    throw e;
  }
}