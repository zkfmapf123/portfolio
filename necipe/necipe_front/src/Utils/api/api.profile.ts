import apiConnect from "./apiConnect";

// 내 피드
export const apiProfile = async ({ privateId, limit, offset }) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
          limit: limit,
          offset: offset
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).profile}`, settings);

    if (res.status === 202) {
      throw "error";
    }

    return (await res.json());
    
  } catch (e) {
    throw e;
  }
};

// 찜 목록 불러오기
export const apiProfileFavorite = async ({ privateId }) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).profileFavorite}`, settings);
  
    return (await res.json());
  } catch (e) {
    throw e;
  }
};

export const apiImageChange = async ({ privateId, imageUrl }) : Promise<void> => {
  try {
    const settings = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: privateId,
          imageUrl : imageUrl
        }
      })
    };

    const res = await fetch(`${apiConnect(__DEV__).profileUpdateImage}`, settings);

    console.log(res.status);

    if (res.status !== 200) {
      throw "not update image";
    }
  } catch (e) {
    throw e;
  }
}