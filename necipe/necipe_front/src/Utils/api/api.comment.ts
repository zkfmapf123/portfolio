import apiConnect from "./apiConnect";

// comment 가져오기
export const apiGetComment = async({recipeId, limit, offset}) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          recipe_id: recipeId,
          offset: offset,
          limit: limit
        }
      })
    };
    
    const res = await fetch(`${apiConnect(__DEV__).getComment}`, settings);
    const { result } = await res.json();

    if (res.status === 202) {
      throw result;
    };

    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

// 댓글 쓰기
export const apiWriteComment = async ({
  recipeId,
  userId,
  referId,
  bgroup,
  sort,
  depth,
  limit,
  offset,
  comment
 }) : Promise<boolean> => {
  try {
    const settings = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          recipe_id: recipeId,
          user_id : userId,
          refer_id: referId,
          bgroup: bgroup,
          sort: sort,
          depth: depth,
          limit: limit,
          offset: offset,
          comment : comment
        }
      })
    };
    
    const res = await fetch(`${apiConnect(__DEV__).createComment}`, settings);
    const { result } = await res.json();

    if (res.status === 202) {
      throw result;
    };

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// delete comment
export const apiDeleteComment = async ({ commentPrivateId}) => {
  try {
    
  } catch (e) {
    
  }
}
