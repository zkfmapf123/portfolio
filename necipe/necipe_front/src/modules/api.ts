import apiConnect from "~/Utils/api/apiConnect";

// recipe api 하나 가져오기
export const getOneNecipe = async (recipeId: number) => {
  try {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          recipe_id: recipeId
        }
      })
    };

    const { result } = await fetch(`${apiConnect(__DEV__).readRecipe}`, settings)
      .then((res) => {
        return res.json();
      }).catch((e) => { throw new Error(e) });
    
    const { mainRecipe, subRecipe } = result.recipes;
    
    return { mainRecipe, subRecipe };
  } catch (e) {
    console.error(e);
  }
};

// 좋아요 , 찜하기 등록하기
export const updateToGoodOrFavorite = async(type : "good" | "favorite",{uid, rid}) => {
  try {
    
    let settings = {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: uid,
          recipe_id: rid
        }
      })
    };

    let url = "";
    if (type === "good") {
      url = apiConnect(__DEV__).updateGood;
    } else {
      url = apiConnect(__DEV__).updateFavorite;
    };

    const res = await fetch(url, settings).catch((e) => { throw new Error(e) });

    if (res.status === 202) {
      throw new Error("not register");
    }
  } catch (e) {
    console.error(e);
  }
};

// 좋아요 , 찜하기 삭제
export const deleteToGoodOrFavorite = async(type : "good" | "favorite",{uid, rid}) => {
  try {
    
    let settings = {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          private_id: uid,
          recipe_id: rid
        }
      })
    };

    let url = "";
    if (type === "good") {
      url = apiConnect(__DEV__).deleteGood;
    } else {
      url = apiConnect(__DEV__).deleteFavorite;
    };

    const res = await fetch(url, settings).catch((e) => { throw new Error(e) });

    if (res.status === 202) {
      throw new Error("not register");
    }
  } catch (e) {
    console.error(e);
  }
};
