const sepetDal = require('../dataAccess/08.sepetDal');
const {logger} = require('../configs/winstonLogger/winstonLogger');

async function getAllSepets(req, res) {
    const result = await sepetDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllSepets failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getSepetById(req, res) {
    const result = await sepetDal.getById(req.body);
    if (result == null || result == undefined) {
        logger.error(`getSepetById failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createSepet(req, res) {
    const result = await sepetDal.create(req.body);
    if (result == null || result == undefined) {
        logger.error(`createSepet failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}


async function deleteSepet(req, res) {
    const result = await sepetDal.deleteById(req.body);
    if (result == null || result == undefined) {
        logger.error(`deleteSepet failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllSepets,
    getById: getSepetById,
    create: createSepet,
    delete: deleteSepet
}