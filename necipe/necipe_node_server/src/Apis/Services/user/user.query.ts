export const GET_USER_INFO =
  "select *, (select count(*) from user_friends where uid = ? and fid = ?) as is_friend from v_user_info where id = ?";

export const GET_POPULAR_RECIPES =
  "select * from v_explore_recipes where user_id = ? order by goodTotal desc limit 5";

export const GET_HASHTAGS =
  "select substring_index(cook_hashtags, ',', 1) as hashtags from v_explore_recipes where user_id = ? order by goodTotal desc limit 5"
  
export const GET_CREATED_RECIPES =
  "call proc_user_recipes(?,?,?,?)";

export const REQUEST_FRIENDS =
  "insert into user_follows(uid, fid) values(?,?)"; 