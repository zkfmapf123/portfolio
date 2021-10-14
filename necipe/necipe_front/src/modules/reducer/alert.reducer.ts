import apiConnect from "~/Utils/api/apiConnect";
import { actionType, alertType } from "~/Utils/types/dto.type";
import { getAlertAction, GET_ALERT_ITEMS } from "../action/alert.action";

const alertInitialState = {
  payload: {
    friends: [],
    logs: [],
  }
}

export const alertReducer = (state = alertInitialState, action: actionType) => {
  
  switch (action.type) {
    
    case `${GET_ALERT_ITEMS}`:
      return {
        ...state,
        payload: action.payload
      };
    
    default: {
      return state;
    }
  }
};

export const getAlertItems = ({ private_id, user_id = 0 }: alertType) => async (dispatch, getState) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: private_id
        }
      })
    };

    const { result } = await fetch(`${apiConnect(__DEV__).alert}`, settings)
      .then((res) => {
        return res.json()
      })
      .catch((e) => { throw new Error(e) });
    
    dispatch(getAlertAction({
      friends: result.friends,
      logs : result.logs
    }));

  } catch (e) {
    console.error(e);
  }
};