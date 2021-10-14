
export type authDto = {
  private_id: number;
  image_url?: string;
  email: string;
  nickname?: string;
  method: "kakao" | "naver" | "google" | "apple";
  os: "android";
};

export type homeType = {
  private_id: number;
  offset: number;
  limit: number;
  orderMethod: "rand" | "created";
};

// create
export type createMainType = {
  title: string;
  hashtags: string;
  thumnail: string;
  time: number;
  star: number;
  const: number;
};

export type createSubType = {
  stage: 1 | 2 | 3 | 4 | 5 | 6;
  shortDescription: string;
  description: string;
  tips: string;
  stuffs: string;
  thumnail: string;
};

export type actionType = {
  type: string;
  payload: {}
};

// deleete
export type recipeMainType = {
  title: string;
  hashtag: Array<string>;
  time: string;
  level: number;
  imageUrl: string | undefined;
  cost: number;
  category: string;
};

export type recipeMainTypes = {
  cook_category: string;
  cook_cost: number;
  cook_hashtags: string;
  cook_star: number;
  cook_thumnail: string;
  cook_time: number;
  cook_title: string;
  created_datetime: string;
  nickname: string;
  recipe_id: number;
};

export type recipeSubType = {
  stage: number;
  shortDescription: string;
  description: string;
  tips: string;
  thumnail: string;
  stuffs: Array<string>;
};

export type recipeType = {
  cook_cost : number;
  cook_hashtags: string;
  cook_star: string;
  cook_thumnail: string;
  cook_time: number;
  cook_title: string;
  created_datetime: string;
  isFavorite: boolean;
  isGood: boolean;
  nickname: string;
  recipe_id: number;
  uid: number;
};

export type alertType = {
  private_id: number;
  user_id?: number;
}

// user dto

export type userInfoType = {
  id: number;
  image_url: string;
  is_friend: boolean;
  nickname: string;
  total_friends: number;
  total_recipes: number;
};

export type PopularRecipeType = {
  recipe_id: number;
  cook_title: string;
  cook_thumnail: string;
};

export type hashtagType = {
  hashtags: string;
}