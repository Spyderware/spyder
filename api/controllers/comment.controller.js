import { HttpStatusCodes, DbUtils } from '../utils/index.js';
import { AccountController, PostController } from './index.js'

export const createComment = async (req, res) => {
    try {
        const { uid, post_id, comment } = req.body;
        if (!uid || !post_id || !comment || comment !== "") {
            res.status(HttpStatusCodes.BadRequest).send({ message: "Invalid payload" });
        } else {
            const account_id = await AccountController.getAccountID(uid);
            const postExists = await PostController.checkIfPostExists(post_id);
            if (!account_id) {
                res.status(HttpStatusCodes.NotFound).send({ message: "Account does not exist" });
            } else if (!postExists) {
                res.status(HttpStatusCodes.NotFound).send({ message: "Post does not exist" });
            } else {
                await DbUtils.spyderdb.none('INSERT INTO comment(account_id, post_id, comment) VALUES(${account_id}, ${post_id}, ${comment})', {
                    account_id: account_id,
                    post_id: post_id,
                    comment: comment
                });
                return res.status(HttpStatusCodes.OK).send({ message: 'Comment created successfully.' });
            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({ message: err.message });
    }
}

export const getAllComments = async (req, res) => {
    try {
        await DbUtils.spyderdb.any('select * from CommentAccountView')
            .then(data => {
                res.status(HttpStatusCodes.OK).send(data);
            });
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({ message: err.message });
    }
}

export const getCommentsByPostId = async (req, res) => {
    try {
        const { post_id } = req.params;
        if (!post_id) {
            res.status(HttpStatusCodes.NotFound).send({ message: "Invalid payload" });
        } else {
            await DbUtils.spyderdb.any('SELECT * FROM CommentAccountView WHERE post_id = $1', [post_id])
                .then(data => {
                    res.status(HttpStatusCodes.OK).send(data);
                })
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({ message: err.message });
    }
}


export const deleteById = async (req, res) => {
    try {
        const { comment_id } = req.params;
        if (!comment_id) {
            res.status(HttpStatusCodes.NotFound).send({ message: "Invalid payload" });
        } else {
            const commentExists = await checkIfCommentExists(comment_id);
            if (!commentExists) {
                res.status(HttpStatusCodes.NotFound).send({ message: "Comment does not exist" });
            } else {
                await DbUtils.spyderdb.result('DELETE FROM comment WHERE comment_id = $1', [comment_id], r => r.rowCount)
                    .then(rows => {
                        res.status(HttpStatusCodes.OK).send({
                            message: "Comment deleted successfully."
                        });
                    });
                res.status(HttpStatusCodes.OK).send({ message: "Comment Deleted successfully." });
            }
        }
    } catch
    (err) {
        res.status(HttpStatusCodes.InternalServerError).send({ message: err.message });
    }
}

export const updateComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { account_id, post_id, comment } = req.body;
        if (!account_id || !post_id || !comment) {
            res.status(HttpStatusCodes.NotFound).send({ message: "Invalid payload" });
        } else {
            const commentExists = await checkIfCommentExists(comment_id);
            const accountExists = await AccountController.checkIfAccountExists(account_id);
            const postExists = await PostController.checkIfPostExists(post_id);
            if (!commentExists) {
                res.status(HttpStatusCodes.NotFound).send({ message: "Comment does not exist" });
            } else if (!accountExists) {
                res.status(HttpStatusCodes.NotFound).send({ message: "Account does not exist" });
            } else if (!postExists) {
                res.status(HttpStatusCodes.NotFound).send({ message: "Post does not exist" });
            } else {
                await DbUtils.spyderdb.none('UPDATE comment SET account_id = $1, post_id = $2, comment = $3 WHERE comment_id = $4', [account_id, post_id, comment, comment_id])
                res.status(HttpStatusCodes.OK).send({ message: "Comment updated successfully." });
            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({ message: err.message });
    }
}


export const checkIfCommentExists = (comment_id) => {
    return DbUtils.spyderdb.oneOrNone('SELECT EXISTS(SELECT 1 FROM comment WHERE comment_id = $1)', [comment_id])
        .then(data => {
            return data.exists;
        })
        .catch(error => {
            throw error;
        });
}