import apiConnect from "./apiConnect";

export const apiBeforeGetSearchPopular = async ({ private_id}): Promise<any> => {
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
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).searchPopular}`, settings);

    if (res.status === 202) {
      throw "네트워크 상태가 올바르지 않습니다";
    };

    return (await res.json());
    
  } catch (e) {
    console.error(e);
  };
};

// 최근 데이터 가져오기
export const apiBeforeGetSearchRecent = async ({ }): Promise<any> => {
  try {
   
  } catch (e) {
    
  }
};

// 검색결과 가져오기
export const apiGetSearchRecipes = async ({ private_id, method,value, limit, offset, sort = "rand" }: homeType) => {
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
          method: method,
          value: value,
          limit: limit,
          offset: offset,
          sort : sort
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__)?.search}`, settings);
  
    // fail
    if (res.status === 202) {
      throw "네트워크 상태가 올바르지 않습니다";
    };
    // success
    return (await res.json());
  } catch (e) {
    console.error(e);
  }
}