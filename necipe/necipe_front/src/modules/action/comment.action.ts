export const GET_COMMENT = "GET_COMMENT";

export const getCommentAction = (comments = []) => ({
  
  type: GET_COMMENT,
  payload: comments
});

