export const GET_FOLLOW_NECIPE = "GET_FOLLOW_NECIPE";
export const GET_NECIPE = "GET_UNFOLLOW_NECIPE";
export const GET_ONE_NECIPE = "GET_ONE_NECIPE";
export const CREATE_NECIPE = "CREATE_NECIPE";

// 팔로우 되어있는 사람들 네시피만 가져오기
export const getFollowNecipes = (recipes : []) => ({
  
  type: GET_FOLLOW_NECIPE,
  payload: {
    recipes: recipes,
    isCreate : false
  }
});

// 모든 데이터 가져오기
export const getNecipe = (necipe: []) => ({

  type: GET_NECIPE,
  payload: {
    necipe: necipe,
    isCreate : false
  }
});

// 네시피 만들기
export const createNecipe = (isCreate: boolean) => ({
  
  type: CREATE_NECIPE,
  payload: {
    isCreate : isCreate
  }
});


