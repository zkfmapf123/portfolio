export enum routers{
  // auth
  AUTH = "/auth",
  AUTH_VALIDATION = "/validation",

  // home - list
  HOME = "/",

  // search
  SEARCH = "/search",
  RECETLY_SEARCH = "/recently",
  POPULAR_SEARCH = "/popular",

  // 알림 정보
  ALERT = "/alert",
  ALERT_ACCEPT = "/accept",
  ALERT_REJECT = "/reject",
  
  // 좋아요 싫어요
  REQUEST = "/request",
  REQUEST_ACCEPT = "/accept",
  REQUEST_REJECT = "/reject",

  // profile
  PROFILE = "/profile",
  PROFILE_FAVORITE = "/favorite",

  // story
  STORY = "/story",

  // 탐색
  EXPLORE = "/explore",

  // 유저
  USER = "/user",
  USER_RECIPES = "/page",
  USER_REQUEST = "/request",

  // 레시피 생성
  RECIPE = "/recipe",
  CREATE_RECIPE = "/create",

  // COMMENT (생성 / 삭제)
  COMMENT = "/comment",
  COMMENT_CHILD = "/child",
  CREATE_COMMENT = "/create",

  GOOD = "/good",
  FAVORITE = "/favorite",
};