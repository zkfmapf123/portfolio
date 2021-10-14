export const GET_USER_USE_NICKNAME =
  "select id from users where nickname = ?";

export const CREATE_USER =
  "insert into users(private_id, image_url, nickname, method, email, os) values(?,?,?,?,?,?)";
  