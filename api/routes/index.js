import {accountRouter} from './account.route.js';
import {categoryRouter} from './category.route.js';
import {postRouter} from './post.route.js';
import {postUpvoteRouter} from './post_upvote.route.js';
import {commentRouter} from './comment.route.js';
import {Router} from "express";
import { authRouter } from './auth.route.js';

export const router = Router();

router.use('/account', accountRouter);
router.use('/category', categoryRouter);
router.use('/post', postRouter);
router.use('/postUpvote', postUpvoteRouter);
router.use('/comment', commentRouter);
router.use('/auth', authRouter);
