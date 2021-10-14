import { homeType } from "../types/dto.type";
import apiConnect from "./apiConnect";

export const getRecipes = async ({ private_id, offset, limit, orderMethod = "rand" }: homeType) => {
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
          orderMethod: orderMethod
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__)?.home}`, settings)
  
    // fail
    if (res.status === 202) {
      throw "네트워크 상태가 올바르지 않습니다";
    };
    // success
    const { result } = await res.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}