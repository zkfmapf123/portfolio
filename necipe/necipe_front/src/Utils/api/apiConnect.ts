import env from "../../../privateEnv";

const HOST: string = env.host;
export const DEV_API_URL: string = `http://${HOST}/api`;

export default (bool : boolean) => {
  if (bool) {
    return {
      auth: `${DEV_API_URL}/auth`,
      authValidation : `${DEV_API_URL}/auth/validation`,
      
      home: `${DEV_API_URL}/`,
      createRecipe: `${DEV_API_URL}/recipe/create`,
      readRecipe : `${DEV_API_URL}/recipe`,
      getComment : `${DEV_API_URL}/comment`,
      createComment : `${DEV_API_URL}/comment/create`,
      delComment : `${DEV_API_URL}/comment`,
      updateGood : `${DEV_API_URL}/good`,
      updateFavorite: `${DEV_API_URL}/favorite`,
      deleteGood : `${DEV_API_URL}/good`,
      deleteFavorite : `${DEV_API_URL}/favorite`,
      alert : `${DEV_API_URL}/alert`,
      alertAccept : `${DEV_API_URL}/alert/accept`,
      alertReject : `${DEV_API_URL}/alert/reject`,
      
      user : `${DEV_API_URL}/user`,
      userRequest : `${DEV_API_URL}/user/request`,
      userPage : `${DEV_API_URL}/user/page`,

      search: `${DEV_API_URL}/search`,
      searchPopular : `${DEV_API_URL}/search/popular`,

      profile : `${DEV_API_URL}/profile`,
      profileUpdateImage : `${DEV_API_URL}/profile`,
      profileFavorite : `${DEV_API_URL}/profile/favorite`,
    }
    // production
  } else {
    return {
      auth: `${DEV_API_URL}/auth`,
      authValidation : `${DEV_API_URL}/auth/validation`,
      
      home: `${DEV_API_URL}/`,
      createRecipe: `${DEV_API_URL}/recipe/create`,
      readRecipe : `${DEV_API_URL}/recipe`,
      getComment : `${DEV_API_URL}/comment`,
      createComment : `${DEV_API_URL}/comment/create`,
      delComment : `${DEV_API_URL}/comment`,
      updateGood : `${DEV_API_URL}/good`,
      updateFavorite: `${DEV_API_URL}/favorite`,
      deleteGood : `${DEV_API_URL}/good`,
      deleteFavorite : `${DEV_API_URL}/favorite`,
      alert : `${DEV_API_URL}/alert`,
      alertAccept : `${DEV_API_URL}/accept`,
      alertReject : `${DEV_API_URL}/reject`,
      
      user : `${DEV_API_URL}/user`,
      userRequest : `${DEV_API_URL}/user/request`,
      userPage : `${DEV_API_URL}/user/page`,

      search: `${DEV_API_URL}/search`,
      searchPopular : `${DEV_API_URL}/search/popular`,

      profile : `${DEV_API_URL}/profile`,
      profileUpdateImage : `${DEV_API_URL}/profile`,
      profileFavorite : `${DEV_API_URL}/profile/favorite`
    } 
  }
}