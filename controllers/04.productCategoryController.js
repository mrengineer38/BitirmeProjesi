const productCategoryDal = require('../dataAccess/04.productCategoryDal');
const { logger } = require('../configs/winstonLogger/winstonLogger');

async function getAllCategories(req, res) {
    const result = await productCategoryDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllCategories failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function getAllDetailed(req, res) {
    const result = await productCategoryDal.getAllDetailed();
    if (result == null || result == undefined) {
        logger.error(`getAllCategories failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function getCategoryById(req, res) {
    const result = await productCategoryDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getCategoryById failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function createCategory(req, res) {
    const result = await productCategoryDal.create(req.body);
    if (result == null || result == undefined) {
        logger.error(`createCategory failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function updateCategory(req, res) {
    const result = await productCategoryDal.updateById(req.body);
    if (result == null || result == undefined) {
        logger.error(`updateCategory failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

async function deleteCategory(req, res) {
    const result = await productCategoryDal.deleteById(req.body);
    if (result == null || result == undefined) {
        logger.error(`deleteCategory failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({ response: "something went wrong!" })
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllCategories,
    getById: getCategoryById,
    create: createCategory,
    update: updateCategory,
    delete: deleteCategory,
    getAllDetailed: getAllDetailed
}