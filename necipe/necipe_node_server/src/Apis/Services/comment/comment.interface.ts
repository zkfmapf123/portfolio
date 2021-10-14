import { CommentReturnType , CommentDelType} from "../../../Utils/returnType";

export interface IComment {
  getComments: () => Promise<CommentReturnType>;
  createComment: () => Promise<CommentDelType>;
  deleteComment: () => Promise<CommentDelType>;
};

export interface ICommentBuilder{
  setCommentPrivateId: (commentPrivateId: number) => this;
  setRecipeId: (recipeId: number) => this;
  setReferId: (referId: number) => this;
  setUserId: (userId : number) => this;
  setBgroup: (bgroup: number) => this;
  setLimit: (limit: number) => this;
  setOffset: (offset: number) => this;
  setSort: (sort: number) => this;
  setComment: (comment: string) => this;
  setDepth: (depth: number) => this;
  create: () => any;
};
