import { Router } from "express";
import { routers } from "../../Configs/routers";
import { CommentController} from "../Controllers/comment.controller";
import FactoryController from "../Controllers/factory";
import { CommentServiceBuilder } from "../Services/comment/comment.service";

const route = Router();

const commentController: CommentController = FactoryController.init(CommentController,new CommentServiceBuilder());

export default (app: Router) => {
  app.use(routers.COMMENT, route);

  // 댓글 조회
  route.post(routers.HOME, commentController.getComment);

  // 댓글 생성
  route.put(routers.CREATE_COMMENT, commentController.createComment);

  // 댓글 삭제
  route.delete(routers.HOME, commentController.deleteComment);
}
