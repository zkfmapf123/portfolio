export const GET_ALERT_COMMENTS =
  "select uid, fid, (select nickname from users where id = fid) as nickname, (select cook_title from recipes where id = rid) as title, comment, created_datetime from userlog where uid = ?";

export const GET_ALERT_FRIENDS =
  "select uid, fid, (select nickname from users where id = fid) as nickname from user_follows where uid = ?";

export const ACCEPT_FRIEND =
  "insert into user_friends(uid, fid) values(?,?)";

export const REJECT_FRIEND =
  "delete from user_follows where uid =? and fid = ?";