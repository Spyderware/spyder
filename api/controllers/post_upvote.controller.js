import {HttpStatusCodes, DbUtils} from '../utils/index.js';
import {AccountController, PostController} from './index.js'

export const upvotePost = async (req, res) => {
    try {
        const {account_id, post_id} = req.body;
        if (!account_id || !post_id) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {
            const accountExists = await AccountController.checkIfAccountExists(account_id);
            const postExists = await PostController.checkIfPostExists(post_id);
            if (!accountExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
            } else if (!postExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Post does not exist"});
            } else {
                await DbUtils.spyderdb.none('INSERT INTO post_upvote(account_id, post_id) VALUES(${account_id}, ${post_id})', {
                    account_id: account_id,
                    post_id: post_id
                });
                return res.status(HttpStatusCodes.OK).send({message: 'Upvote added successfully.'});
            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const getAllPostUpVote = async (req, res) => {
    try {
        await DbUtils.spyderdb.any('SELECT * FROM post_upvote')
            .then(data => {
                res.status(HttpStatusCodes.OK).send(data);
            });
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const getPostUpvoteById = async (req, res) => {
    try {
        const {post_interaction_id} = req.params;
        if (!post_interaction_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM post_upvote WHERE post_interaction_id = $1', [post_interaction_id])
                .then(data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Post Upvote does not exist"});
                    } else {
                        res.status(HttpStatusCodes.OK).send(data);
                    }
                });

        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const deletePostUpvote = async (req, res) => {
    try {
        const {post_interaction_id} = req.params;
        if (!post_interaction_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            const exist = await checkIfPostUpvoteExists(post_interaction_id);
            if (!exist) {
                res.status(HttpStatusCodes.NotFound).send({message: "Post Upvote does not exist"});
            } else {
                await DbUtils.spyderdb.result('DELETE FROM post_upvote WHERE post_interaction_id = $1', [post_interaction_id])
                    .then(rows => {
                        res.status(HttpStatusCodes.OK).send({
                            message: "Post Upvote Upvote deleted successfully."
                        });
                    });

            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

const checkIfPostUpvoteExists = (post_interaction_id) => {
    return DbUtils.spyderdb.oneOrNone('SELECT EXISTS(SELECT 1 FROM post_upvote WHERE post_interaction_id = $1)', [post_interaction_id])
        .then(data => {
            return data.exists;
        })
        .catch(error => {
            throw error;
        });
}
