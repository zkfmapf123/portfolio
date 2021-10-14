export const GET_POPULAR_DATA =
  "select recipe_id,cook_title, cook_thumnail from v_explore_recipes order by goodTotal asc limit 5";

  