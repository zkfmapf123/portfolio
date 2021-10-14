export const GET_RECENTLY_MAKE_CREATE_RECIPE =
  "select id from recipes where uid = ? order by created_datetime desc limit 1";

export const CREATE_MAIN =
  "insert into recipes(uid, cook_title,cook_category, cook_time, cook_cost, cook_star, cook_thumnail, cook_hashtags) values(?,?,?,?,?,?,?,?)";

export const CREATE_SUB =
  "insert into recipe_docs(rid, stage, short_str, description, tips, stuffs, image_url) values(?,?,?,?,?,?,?)";

export const DELETE_RECIPE =
  "delete from recipes where id=?";

export const GET_RECIPE_MAIN =
  "select id as recipe_id,uid,(select nickname from users where id = uid) as nickname, cook_category, cook_title, cook_time, cook_cost, cook_star, cook_thumnail, cook_hashtags,created_datetime from recipes where id = ?";

export const GET_RECIPE_SUB =
  "select stage, short_str, description, tips, stuffs, image_url from recipe_docs where rid = ? order by stage asc";