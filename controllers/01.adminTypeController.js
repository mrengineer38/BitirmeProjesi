const adminTypeDal = require('../dataAccess/01.adminTypeDal');
const {logger} = require('../configs/winstonLogger/winstonLogger');

async function getAllAdminTypes(req, res) {
    const result = await adminTypeDal.getAll();
    if(result == null || result == undefined){
        logger.error(`getAllAdminTypes failed.`,{"file": __filename,message:"query error"});
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getAdminTypeById(req, res) {
    const result = await adminTypeDal.getById(req.params.id);
    if(result == null || result == undefined){
        logger.error(`getAdminTypeById failed.`,{"file": __filename,message:"query error"});
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createAdminType(req, res) {
    const result = await adminTypeDal.create(req.body);
    if(result == null || result == undefined){
        logger.error(`createAdminType failed.`,{"file": __filename,message:"query error"});
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function updateAdminType(req, res) {
    const result = await adminTypeDal.updateById(req.body);
    if(result == null || result == undefined){
        logger.error(`updateAdminType failed.`,{"file": __filename,message:"query error"});
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function deleteAdminType(req, res) {
    const result = await adminTypeDal.deleteById(req.body);
    if(result == null || result == undefined){
        logger.error(`deleteAdminType failed.`,{"file": __filename,message:"query error"});
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllAdminTypes,
    getById: getAdminTypeById,
    create: createAdminType,
    update: updateAdminType,
    delete: deleteAdminType
}