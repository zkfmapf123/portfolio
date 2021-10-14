export type commenDto = {
  comment_private_id?: number; // 현재 유저 아이디
  recipe_id: number;   // 레시피 아이디
  user_id: number;
  limit ?: number;
  offset?: number;
};

export type createCommentDto = commenDto & {
  refer_id?: number;
  bgroup: number;
  sort: number;
  depth: number;
  comment: string;
};

