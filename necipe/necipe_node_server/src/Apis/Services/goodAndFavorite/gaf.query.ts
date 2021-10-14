export const UPDATE_GOOD =
  "insert into recipe_good(uid, rid) values(?,?)";

export const DELETE_GOOD =
"delete from recipe_good where uid = ? and rid = ?";

export const UPDATE_FAVORITE =
  "insert into recipe_favorite(uid, rid) values(?,?)";

export const DELETE_FAVORITE =
  "delete from recipe_favorite where uid = ? and rid = ?";
   