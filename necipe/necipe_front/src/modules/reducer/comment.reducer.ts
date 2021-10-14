import apiConnect from "~/Utils/api/apiConnect";
import { actionType } from "~/Utils/types/dto.type";
import { getCommentAction, GET_COMMENT } from "../action/comment.action";

const commentInitialState = {
  payload: {
    comments: []
  }
};

export const commentReducer = (state = commentInitialState, action: actionType) => {
  
  switch (action.type) {
    
    case `${GET_COMMENT}`:

      return {
        ...state,
        payload: action.payload
      }
    
    default: {
      return state;
    }
  }
};

export const getCommentReducer = ({recipe_id, limit , offset}) => async (dispatch, getState) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          recipe_id: recipe_id,
          limit: limit,
          offset: offset
        }
      })
    };

    const { result } = await fetch(`${apiConnect(__DEV__).getComment}`, settings)
      .then((res) => {
        return res.json()
      })
      .catch((e) => { throw new Error(e) });
    
      dispatch(getCommentAction(result));
  } catch (e) {
    console.error(e);
    throw new Error(e);
  } 
};

// 댓글 상단 질문
export const createRootCommentReducer = ({recipe_id, user_id ,bgroup, sort, depth, comment}) => async (dispatch, getState) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          recipe_id: recipe_id,
          user_id: user_id,
          bgroup: bgroup,
          sort: sort,
          depth: depth,
          comment : comment
        }
      })
    };

    const { result } = await fetch(`${apiConnect(__DEV__).createComment}`, settings)
      .then((res) => {
        return res.json()
      })
      .catch((e) => { throw new Error(e) });
    
    dispatch(getCommentAction(result));
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

// 댓글 하단 질문
export const createChildcommentReducer = ({ recipe_id, refer_id, user_id, bgroup, sort, depth, comment }) => async (dispatch, getState) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          recipe_id: recipe_id,
          user_id: user_id,
          bgroup: bgroup,
          refer_id : refer_id,
          sort: sort,
          depth: depth,
          comment : comment
        }
      })
    };

    const { result } = await fetch(`${apiConnect(__DEV__).createComment}`, settings)
      .then((res) => {
        console.log(result.json());
        return res.json()
      })
      .catch((e) => { throw new Error(e) });
  
      dispatch(getCommentAction(result));
    } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
export const deleteCommentReducer = ({private_id}) => async (dispatch, getState) => {
  try {
    const settings = {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id : private_id
        }
      })
    };

    const { result } = await fetch(`${apiConnect(__DEV__).delComment}`, settings)
      .then((res) => {
        return res.json()
      })
      .catch((e) => { throw new Error(e) });
    
      dispatch(getCommentAction(result));
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};