export const UPDATE_IMAGE =
  "update users set image_url = ? where id = ?";

export const GET_FAVORITE_RECIPE =
  "select ver.recipe_id, ver.user_id, ver.nickname, ver.cook_title, ver.cook_thumnail from recipe_favorite rf join v_explore_recipes ver on rf.rid = ver.recipe_id and rf.uid = ?";

export const GET_MY_INFO =
  "select nickname, image_url, (select count(*) from recipes where uid = id) as recipeTotal, (select count(*) from user_friends where uid = id) as friendTotal from users where id = ?";

export const GET_MY_CREATE_RECIPE =
  "select recipe_id, goodTotal, cook_title, cook_thumnail from v_explore_recipes where user_id = ? order by created_datetime desc ";

export const GET_MY_HASHTAG =
  "select substring_index(cook_hashtags,',',1) as hashtags from v_explore_recipes where user_id = ? order by goodTotal desc limit 5";

export const GET_MY_POPULAR_RECIPES =
  "select recipe_id, cook_thumnail from v_explore_recipes where user_id = ? order by goodTotal desc limit 5";