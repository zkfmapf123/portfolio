export type UserDto ={
  private_id: number; // 현재 사용중인 user_id
  user_id?: number;    // 보고싶은 user_id
  limit: number;
  offset: number;
};

