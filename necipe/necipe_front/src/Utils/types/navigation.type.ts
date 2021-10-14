export type StackNavigationTypes = {
  Login: undefined,
  Join : undefined,

  Profile: {
    private_id: string;
    email: string;
    method: "kakao" | "naver";
    os: "andorid" | "ios";
  },

  // stack
  Create : undefined,
  CreateMain: undefined,
  CreateSub: undefined,

  // stack
  Home: undefined,
  Recipe: undefined,
  User : undefined,
  
  Tab: undefined,

  Alert: undefined,

  Explore : undefined,

}