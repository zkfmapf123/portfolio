import apiConnect from "./apiConnect";

// 수락하기
export const apiAccept = async ({privateId, userId}) : Promise<void> => {
  try {
    const settings = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json" 
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
          user_id : userId
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).alertAccept}`, settings);

    if (res.status === 202) {
      throw "네트워크 상태가 올바르지 않습니다";
    };

  } catch (e) {
    throw new Error(e);
  }
};

// 거절하기
export const apiReject = async({privateId, userId}) : Promise<void> => {
  try {
    const settings = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json" 
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
          user_id : userId
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).alertReject}`, settings);

    if (res.status === 202) {
      throw "네트워크 상태가 올바르지 않습니다"
    };

  } catch (e) {
    throw new Error(e);
  }
};