import { createNecipe, CREATE_NECIPE, getFollowNecipes, GET_FOLLOW_NECIPE, GET_NECIPE, GET_ONE_NECIPE } from "../action/necipe.action";
import API from "~/Utils/api/apiConnect";
import { actionType, homeType, recipeMainType, recipeSubType } from "~/Utils/types/dto.type";

type createRecipeType = {
  private_id: string;
  mainRecipe: recipeMainType,
  subRecipe: recipeSubType[]
};

const necipeInitialState = {
  payload: {
    recieps: [],
    isComplete : false
  }
};

export const necipeReducer = (state = necipeInitialState, action: actionType) => {
  
  switch (action.type) {
  
    case `${GET_NECIPE}`:
      return {
        ...state,
        payload: action.payload
      }
    
    case `${GET_FOLLOW_NECIPE}`:

      return {
        payload : action.payload
      }
    
    case `${CREATE_NECIPE}`:
      return {
        payload : action.payload
      }
    
    default:
      return state;
  }
};

/*     redux-thunk && dispatch        */

// 팔로우된 데이터만 가져오기
export const getFollowNecipe = ({private_id, offset, limit, orderMethod}: homeType) => async(dispatch, getState) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: private_id,
          offset: offset,
          limit: limit,
          orderMethod : orderMethod
        }
      })
    };

    const {result} = await fetch(`${API(__DEV__)?.home}`, settings)
      .then((res) => {
        return res.json()
      });
    
    dispatch(getFollowNecipes(result.recieps));

  } catch (e) {
    console.error(e);
    dispatch(getFollowNecipes([]));
  }
};

// necipe 모든 데이터 가져오기
export const getNecipeItems = () => async(dispatch, getState) => {
  try {
    
  } catch (e) {
    
  }
};

// necipe 삭제
export const deleteNecipe = () => async (dispatch, getState) => {
  try {
    
  } catch (e) {
    
  }
}

// necipe 만들기
export const createNeciepItems = ({private_id, mainRecipe, subRecipe} : createRecipeType) => async (dispatch, getState) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          private_id : private_id,
          mainRecipe,
          subRecipe
        }
      })
    };

    const response = await fetch(`${API(__DEV__).createRecipe}`, settings);
    if (response.status === 200) {
      dispatch(createNecipe(true));
    } else {
      dispatch(createNecipe(false));
    }
  } catch (e) {
    console.error(e);
  }
};





