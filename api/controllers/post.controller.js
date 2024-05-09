import {HttpStatusCodes, DbUtils} from '../utils/index.js';
import {AccountController, CategoryController} from './index.js'

export const createPost = async (req, res) => {
    try {
        const {uid, title, body, category} = req.body;
        if (!uid || !title || !body || !category) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {

            const account_id = await AccountController.getAccountID(uid);
            const category_id = await CategoryController.getCategoryID(category);
            if (!accountExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
            } else if (!categoryExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Category does not exist"});
            } else {
                await DbUtils.spyderdb.none('INSERT INTO post(account_id, title, body, category_id) VALUES(${account_id}, ${title}, ${body}, ${category_id})', {
                    account_id: account_id,
                    title: title,
                    body: body,
                    category_id: category_id,
                });
                res.status(HttpStatusCodes.OK).send({message: 'Post created successfully.'});
            }

        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const {title, category} = req.query;
        if (!title) {
            const posts = await DbUtils.spyderdb.any('SELECT * FROM PostAccountView');
            res.status(HttpStatusCodes.OK).send(posts);
        } else {
            if (category) {
                await DbUtils.spyderdb.any('SELECT * FROM PostAccountView WHERE category = $1 AND title LIKE $2', [category, '%' + title + '%'])
                    .then(data => {
                        res.status(HttpStatusCodes.OK).send(data);
                    })
            } else {
                await DbUtils.spyderdb.any('SELECT * FROM PostAccountView WHERE title LIKE $1', ['%' + title + '%'])
                    .then(data => {
                        res.status(HttpStatusCodes.OK).send(data);
                    })
            }
        }

    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const getPostByPostId = async (req, res) => {
    try {
        const {post_id} = req.params;
        if (!post_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM PostAccountView WHERE post_id = $1', [post_id])
                .then(data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Post does not exist"});
                    } else {
                        res.status(HttpStatusCodes.OK).send(data);
                    }
                });

        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const deleteByPostId = async (req, res) => {
    try {
        const {post_id} = req.params;
        if (!post_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            const existingPost = await checkIfPostExists(post_id);
            if (!existingPost) {
                res.status(HttpStatusCodes.NotFound).send({message: "Post does not exist"});
            } else {
                await DbUtils.spyderdb.result('DELETE FROM post WHERE post_id = $1', [post_id], r => r.rowCount)
                    .then(rows => {
                        res.status(HttpStatusCodes.OK).send({
                            message: "Post deleted successfully."
                        });
                    });
            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const updatePost = async (req, res) => {
    try {
        const {post_id} = req.params;
        const {account_id, title, body, category_id} = req.body;
        if (!account_id || !title || !body || !category_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            const existingPost = await checkIfPostExists(post_id);
            const accountExists = await AccountController.checkIfAccountExists(account_id);
            const categoryExists = await CategoryController.checkIfCategoryExists(category_id);
            if (!existingPost) {
                res.status(HttpStatusCodes.NotFound).send({message: "Post does not exist"});
            } else if (!accountExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
            } else if (!categoryExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Category does not exist"});
            } else {
                await DbUtils.spyderdb.none('UPDATE post SET ' +
                    'account_id = $1, ' +
                    'title = $2, ' +
                    'body = $3, ' +
                    'category_id = $4 ' +
                    'WHERE post_id = $5', [account_id, title, body, category_id, post_id]);
                res.status(HttpStatusCodes.OK).send({message: "Post updated successfully."});
            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};


export const checkIfPostExists = (post_id) => {
    return DbUtils.spyderdb.oneOrNone('SELECT EXISTS(SELECT 1 FROM post WHERE post_id = $1)', [post_id])
        .then(data => {
            return data.exists;
        })
        .catch(error => {
            throw error;
        });
}





