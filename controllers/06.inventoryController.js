const inventoryDal = require('../dataAccess/06.inventoryDal');
const { logger } = require('../configs/winstonLogger/winstonLogger');

async function getAllInventories(req, res) {
    const result = await inventoryDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllInventories failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getInventoryById(req, res) {
    const result = await inventoryDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getInventoryById failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createInventory(req, res) {
    const result = await inventoryDal.create(req.body);
    if (result == null || result == undefined) {
        logger.error(`createInventory failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function updateInventory(req, res) {
    const result = await inventoryDal.updateById(req.body);
    if (result == null || result == undefined) {
        logger.error(`updateInventory failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function deleteInventory(req, res) {
    const result = await inventoryDal.deleteById(req.body);
    if (result == null || result == undefined) {
        logger.error(`deleteInventory failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllInventories,
    getById: getInventoryById,
    create: createInventory,
    update: updateInventory,
    delete: deleteInventory
}