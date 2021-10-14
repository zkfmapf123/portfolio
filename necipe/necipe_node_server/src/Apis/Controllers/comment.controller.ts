import { Request, Response } from "express";
import { AppController } from "../../Utils/Packages/AppController";
import { commenDto, createCommentDto } from "../Services/comment/commen.dto";
import { CommentServiceBuilder } from "../Services/comment/comment.service";

export class CommentController extends AppController {
  private readonly commentService: CommentServiceBuilder;

  constructor(service : CommentServiceBuilder) {
    super();
    this.commentService = service;
  };

  static create(service : CommentServiceBuilder) {
    return new CommentController(service);
  };

  // comment를 가져온다.
  public getComment = async (req: Request, res: Response): Promise<any> => {

    this.profiler.start();
    const { recipe_id, limit, offset }: commenDto = req.body.data;
    const commentService = this.commentService
      .setRecipeId(recipe_id)
      .setLimit(limit)
      .setOffset(offset)
      .create();
    
    const [comments, error] = await commentService.getComments();

    this.profiler.end("get Comment");
    // fail
    if (comments === undefined) {
      return res.status(202).json({
        result: error
      });
    };

    // success
    return res.status(200).json({
      result: {
        comments: comments
      } 
    })
  };

  // create 한다.
  public createComment = async (req: Request, res: Response): Promise<any> => {
    this.profiler.start();
    
    const { recipe_id,bgroup,user_id,refer_id, sort, depth, comment }: createCommentDto = req.body.data;

    const commentService = this.commentService
      .setBgroup(bgroup)
      .setUserId(user_id)
      .setRecipeId(recipe_id)
      .setComment(comment)
      .setDepth(depth)
      .setReferId(refer_id)
      .setSort(sort)
      .create();

    const [isCreate, error1] = await commentService.createComment();

    // check create comment ==> fail
    if (isCreate === false) {
      this.profiler.end("create comment");
      return res.status(202).json({})
    };

    this.profiler.end("create comment");
    return res.status(200).json({})
  };

  // delete 
  public deleteComment = async (req: Request, res: Response): Promise<any> => {
    this.profiler.start();

    const { comment_private_id }: createCommentDto = req.body.data;
    const commentService = this.commentService
      .setCommentPrivateId(comment_private_id)
      .create();
    
    const [isDelete, error1] = await commentService.deleteComment();

    // check delete comment ==> false
    if (isDelete === false) {
      this.profiler.end("delete comment");
      return res.status(202).json({
        result: error1
      });
    };

    const [result, error2] = await commentService.getComments();
    
    if (result === undefined) {
      this.profiler.end("delete comment");
      return res.status(202).json({
        result : error2
      })
    };

    this.profiler.end("delete comment");
    return res.status(200).json({
      comments : result
    });
  };
}