export type SearchDto = {
  isPopular?:boolean
  private_id: number;
  method: "hashtag" | "category";
  value: string;
  limit: number;
  offset: number;
  sort : "rand" | "created" | "cost" | "good"
};

