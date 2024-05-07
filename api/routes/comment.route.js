import {Router} from 'express';
import {CommentController} from "../controllers/index.js";
export const commentRouter = Router();

commentRouter.post('/', CommentController.createComment);
commentRouter.get('/', CommentController.getAllComments);
commentRouter.get('/byPostId/:post_id', CommentController.getCommentsByPostId);
commentRouter.delete('/:comment_id', CommentController.deleteById);
commentRouter.put('/:comment_id', CommentController.updateComment);

