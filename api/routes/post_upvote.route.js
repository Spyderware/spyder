import {Router} from 'express';
import {PostUpvoteController} from "../controllers/index.js";

export const postUpvoteRouter = Router();

postUpvoteRouter.post('/', PostUpvoteController.upvotePost);
postUpvoteRouter.get('/', PostUpvoteController.getAllPostUpVote);
postUpvoteRouter.get('/:post_interaction_id', PostUpvoteController.getPostUpvoteById);
postUpvoteRouter.delete('/:post_interaction_id', PostUpvoteController.deletePostUpvote);

