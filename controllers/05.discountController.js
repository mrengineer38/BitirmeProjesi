const discountDal = require('../dataAccess/05.discountDal');
const { logger } = require('../configs/winstonLogger/winstonLogger');

async function getAllDiscounts(req, res) {
    const result = await discountDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllDiscounts failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getDiscountById(req, res) {
    const result = await discountDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getDiscountById failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createDiscount(req, res) {
    const result = await discountDal.create(req.body);
    if (result == null || result == undefined) {
        logger.error(`createDiscount failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function updateDiscount(req, res) {
    const result = await discountDal.updateById(req.body);
    if (result == null || result == undefined) {
        logger.error(`updateDiscount failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function deleteDiscount(req, res) {
    const result = await discountDal.deleteById(req.body);
    if (result == null || result == undefined) {
        logger.error(`deleteDiscount failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllDiscounts,
    getById: getDiscountById,
    create: createDiscount,
    update: updateDiscount,
    delete: deleteDiscount
}