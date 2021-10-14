import AsyncStorage from "@react-native-async-storage/async-storage";
import { actionType } from "~/Utils/types/dto.type";
import { getPrivateIdAction, GET_PRIVATE_ID } from "../action/common.action";

const commonInitialState = {
  payload: {
    privateId: 0
  }
};

export const commonReducer = (state = commonInitialState, action: actionType) => {
  
  switch (action.type) {
    case `${GET_PRIVATE_ID}`:
      return {
        ...state,
        payload: action.payload
      }
    
    default: {
      return state;
    }
  }
};

// private_id 가져오기
export const getPrivateIdReducer = () => async(dispatch, getState) => {
  try {
    
    await AsyncStorage.getItem("userInfo")
      .then((result) => {
        const stringResult = JSON.parse(result);
        dispatch(getPrivateIdAction(stringResult.privateId))
      });
    
  } catch (e) {
    console.error(e);
  }
};