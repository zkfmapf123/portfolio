export type AuthDto = {
  private_id: string;
  nickname: string;
  image_url: string;
  method: "kakao" | "naver" | "apple";
  email: string;
  os: "android" | "ios"
};
