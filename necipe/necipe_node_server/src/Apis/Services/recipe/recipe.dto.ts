// 레시피 메인
export type RecipeMainType = {
  title: string; 
  time : string; 
  level: number;
  category: string;
  imageUrl: string; 
  hashtag: Array<string>;
  cost: number;
};

// 레시피 세부 설명서
export type RecipeDocsType = {
  description: string;
  shortDescription: string;
  stage: number;
  stuffs: Array<string>;
  thumnail: string;
  tips: string;
};

// paramter type
export type IdType = {
  id: number;
}

export type CreateRecipeDto = {
  private_id?: number;
  mainRecipe: RecipeMainType;
  subRecipe: RecipeDocsType[];
};

/**
 * recipe sub type
 */

export type RecipeReadAndDeleteType = {
  recipe_id: number;
};

export type recipeToalType = {
  mainRecipe: unknown
  subRecipe: unknown
};


