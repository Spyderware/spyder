import {accountRouter} from './account.route.js';
import {categoryRouter} from './category.route.js';
import {postRouter} from './post.route.js';
import {postUpvoteRouter} from './post_upvote.route.js';
import {Router} from "express";

export const router = Router();

router.use('/account', accountRouter);
router.use('/category', categoryRouter);
router.use('/post', postRouter);
router.use('/postUpvote', postUpvoteRouter);

