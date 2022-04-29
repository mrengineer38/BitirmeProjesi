const userDal = require('../dataAccess/03.userDal');
const { logger } = require('../configs/winstonLogger/winstonLogger');

async function getAllUsers(req, res) {
    const result = await userDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllUsers failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getUserById(req, res) {
    const result = await userDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getUserById failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createUser(req, res) {
    const result = await userDal.create(req.body);
    if (result == null || result == undefined) {
        logger.error(`createUser failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function updateUser(req, res) {
    const result = await userDal.updateById(req.body);
    if (result == null || result == undefined) {
        logger.error(`updateUser failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function deleteUser(req, res) {
    const result = await userDal.deleteById(req.body);
    if (result == null || result == undefined) {
        logger.error(`deleteUser failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllUsers,
    getById: getUserById,
    create: createUser,
    update: updateUser,
    delete: deleteUser
}