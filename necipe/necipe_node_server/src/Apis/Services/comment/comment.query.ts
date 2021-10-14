export const CREATE_COMMENTS =
  "insert into comments(rid, uid, bgroup, sorts, depth, cmt) values(?,?,?,?,?,?)";

export const CREATE_COMMENTS_INCLUDE_REFER =
  "insert into comments(rid, uid, bgroup, refer_id, sorts, depth, cmt) values(?,?,?,?,?,?,?)";

export const DELETE_COMMENTS =
  "delete from comments where id = ?";