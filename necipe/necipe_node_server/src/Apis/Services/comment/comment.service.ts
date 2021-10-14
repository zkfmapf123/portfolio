import { AppServices } from "../../../Utils/Packages/AppServices";
import { CommentDelType, CommentReturnType} from "../../../Utils/returnType";
import { createCommentDto } from "./commen.dto";
import { IComment, ICommentBuilder } from "./comment.interface";
import Log from "../../../Utils/Error/create.error";
import CurrntDate from "../../../Utils/date";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { CREATE_COMMENTS, CREATE_COMMENTS_INCLUDE_REFER, DELETE_COMMENTS} from "./comment.query";

class CommentService extends AppServices implements IComment {

  private readonly commentPrivateId: number;   // comment private id
  private readonly recipeId: number;           // recipe rid
  private readonly userId: number;             // write user id
  private readonly referId: number;
  private readonly bgroup: number;
  private readonly sort: number;
  private readonly comment: string;
  private readonly depth: number;
  private readonly limit: number;
  private readonly offset: number;

  constructor({user_id, refer_id = 0, comment_private_id,recipe_id, bgroup, sort, comment, depth, limit,offset}: createCommentDto) {
    super();
    this.recipeId = recipe_id;
    this.userId = user_id;
    this.referId = refer_id;
    this.commentPrivateId = comment_private_id;
    this.bgroup = bgroup;
    this.sort = sort;
    this.comment = comment;
    this.depth = depth;
    this.limit = limit;
    this.offset = offset;
  }

  // 코맨트 전체를 가져온다.
  public getComments = async (): Promise<CommentReturnType> => {
    try {
    
      
      const [row] = await dbConn({
        dbQuery: `select vc.*, (select count(*) from comments where bgroup = vc.bgroup and depth >= 2) as child_comments from v_comment vc where rid = ${this.recipeId} and depth = 1 order by created_datetime desc limit ${this.limit} offset ${this.offset}`,
        dbParams: ``
      });
    
      return [row,undefined];
    }catch(e){
      Log({
        err: "error",
        errTitle: "get comments",
        errDate: CurrntDate.errDate,
        errDescription: e,
        errUserId: this.userId
      });
      return [undefined, e];
    }
  };

  // 코맨트 등록하기
  public createComment = async (): Promise<CommentDelType> => {
    try {

      if (this.referId === 0) {
        await dbConn({
          dbQuery: `${CREATE_COMMENTS}`,
          dbParams: `${this.recipeId},
                     ${this.userId},
                     ${this.bgroup},
                     ${this.sort},
                     ${this.depth},
                     ${this.comment}`
        });
      } else {
        await dbConn({
          dbQuery: `${CREATE_COMMENTS_INCLUDE_REFER}`,
          dbParams: `${this.recipeId},
                     ${this.userId},
                     ${this.bgroup},
                     ${this.referId},
                     ${this.sort},
                     ${this.depth},
                     ${this.comment}`
        });
      }

      return [true, undefined];
    }catch(e){
      Log({
        err: "error",
        errTitle: "create comments",
        errDate: CurrntDate.errDate,
        errDescription: e,
        errUserId: this.userId
      });
      return [false, e];
    }
  };

  public deleteComment = async (): Promise<CommentDelType> => {
    try {
      
      await dbConn({
        dbQuery: `${DELETE_COMMENTS}`,
        dbParams: `${this.commentPrivateId}`
      });

      return [true,undefined];
    }catch(e){
      Log({
        err: "error",
        errTitle: "delete comments",
        errDate: CurrntDate.errDate,
        errDescription: e,
        errUserId: this.userId
      });
      return [false, e];
    }
  };
};

export class CommentServiceBuilder implements ICommentBuilder{
  private recipeId: number;
  private userId: number;
  private referId: number;
  private bgroup: number;
  private sort: number;
  private comment: string;
  private depth: number;
  private commentPrivateId: number;
  private limit: number;
  private offset: number;

  setCommentPrivateId = (privateId: number): this => {
    this.commentPrivateId = privateId;
    return this;
  };

  setLimit = (limit: number): this => {
    this.limit = limit;
    return this;
  };

  setOffset = (offset: number): this => {
    this.offset = offset;
    return this;
  }

  setReferId = (referId: number): this => {
    this.referId = referId;
    return this;
  }

  setRecipeId = (recipeId: number): this => {
    this.recipeId = recipeId;
    return this;
  };

  setUserId = (userId: number) : this=>{
    this.userId = userId;
    return this;
  };

  setBgroup = (bgroup: number) : this=>{
    this.bgroup = bgroup;
    return this;
  };

  setSort = (sort: number): this => {
    this.sort = sort;
    return this;
  };

  setComment = (comment: string) : this=>{
    this.comment = comment;
    return this;
  };

  setDepth = (depth: number) : this=>{
    this.depth = depth;
    return this;
  };

  create = () => {
    return new CommentService({
      comment_private_id : this.commentPrivateId,
      user_id : this.userId,
      recipe_id: this.recipeId,
      refer_id : this.referId,
      bgroup: this.bgroup,
      sort: this.sort,
      comment: this.comment,
      depth: this.depth,
      limit: this.limit,
      offset : this.offset
    });
  }
};