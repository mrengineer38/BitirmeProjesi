const adminDal = require('../dataAccess/02.adminDal');
const { logger } = require('../configs/winstonLogger/winstonLogger');

async function getAllAdmins(req, res) {
    const result = await adminDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllAdmins failed.`, { file: __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getAdminById(req, res) {
    const result = await adminDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getAdminById failed.`, { file: __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createAdmin(req, res) {
    const result = await adminDal.create(req.body);
    if (result == null || result == undefined) {
        logger.error(`createAdmin failed.`, { file: __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function updateAdmin(req, res) {
    const result = await adminDal.updateById(req.body);
    if (result == null || result == undefined) {
        logger.error(`updateAdmin failed.`, { file: __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function deleteAdmin(req, res) {
    const result = await adminDal.deleteById(req.body);
    if (result == null || result == undefined) {
        logger.error(`deleteAdmin failed.`, { file: __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllAdmins,
    getById: getAdminById,
    create: createAdmin,
    update: updateAdmin,
    delete: deleteAdmin
}