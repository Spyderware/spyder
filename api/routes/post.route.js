import {Router} from 'express';
import {PostController} from "../controllers/index.js";

export const postRouter = Router();

postRouter.post('/', PostController.createPost);
postRouter.get('/', PostController.getAllPosts);
postRouter.get('/:post_id', PostController.getPostByPostId);
postRouter.delete('/:post_id', PostController.deleteByPostId);
postRouter.put('/:post_id', PostController.updatePost);
postRouter.get('/:title/:category', PostController.searchPostByTitleAndCategory);

