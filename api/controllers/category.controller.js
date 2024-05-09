import {HttpStatusCodes, DbUtils} from '../utils/index.js';

export const createCategory = async (req, res) => {
    try {
        const {category} = req.body;
        if (!category) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM category WHERE category = $1', [category])
                .then(async data => {
                    if (data) {
                        res.status(HttpStatusCodes.Conflict).send({message: "Category already exists"});
                    } else {
                        await DbUtils.spyderdb.none('INSERT INTO category(category) VALUES(${category})', {
                            category: category
                        });
                        return res.status(HttpStatusCodes.OK).send({message: 'Category created successfully.'});
                    }
                });
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const getAllCategories = async (req, res) => {
    try {
        await DbUtils.spyderdb.any('SELECT * FROM category')
            .then(data => {
                res.status(HttpStatusCodes.OK).send(data);
            });
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const getCategoryByCategoryId = async (req, res) => {
    try {
        const {category_id} = req.params;
        if (!category_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM category WHERE category_id = $1', [category_id])
                .then(data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Category does not exist"});
                    } else {
                        res.status(HttpStatusCodes.OK).send(data);
                    }
                });
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const deleteByCategoryId = async (req, res) => {
    try {
        const {category_id} = req.params;
        if (!category_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM category WHERE category_id = $1', [category_id])
                .then(async data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Category does not exist"});
                    } else {
                        await DbUtils.spyderdb.result('DELETE FROM category WHERE category_id = $1', [category_id], r => r.rowCount)
                            .then(rows => {
                                res.status(HttpStatusCodes.OK).send({
                                    message: "Category deleted successfully."
                                });
                            });
                    }
                });
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};

export const updateCategory = async (req, res) => {
    try {
        const {category_id} = req.params;
        const {category} = req.body;
        if (!category) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM category WHERE category_id = $1', [category_id])
                .then(async data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Category does not exist"});
                    } else {
                        await DbUtils.spyderdb.none('UPDATE category SET category = ${category} WHERE category_id = ${category_id}', {
                            category: category,
                            category_id: category_id
                        });
                        res.status(HttpStatusCodes.OK).send({message: "Category updated successfully."});
                    }
                });
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
};
export const checkIfCategoryExists = (category_id) => {
    return DbUtils.spyderdb.oneOrNone('SELECT EXISTS(SELECT 1 FROM category WHERE category_id = $1)', [category_id])
        .then(data => {
            return data.exists;
        })
        .catch(error => {
            throw error;
        });
}

export const getCategoryID = async (category) => {
    var category_id = null;
    await DbUtils.spyderdb.oneOrNone('SELECT category_id FROM account WHERE category = $1', [category])
        .then(async data => {
            category_id = data.category_id
        })
    return category_id;
}

export const checkIfCategoryExistsByName = (category) => {
    return DbUtils.spyderdb.oneOrNone('SELECT EXISTS(SELECT 1 FROM category WHERE category = $1)', [category])
        .then(data => {
            return data.exists;
        })
        .catch(error => {
            throw error;
        });
}
