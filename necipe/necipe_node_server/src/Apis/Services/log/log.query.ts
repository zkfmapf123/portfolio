export const FRIEND_LOG =
  "insert into user_follows(uid, fid) values(?,?)";

export const COMMENT_LOG =
  "insert into userlog(uid, fid, rid) values(?,?,?)";