const productDal = require('../dataAccess/07.productDal');
const productDalElastic = require('../dataAccess/07.productElasticDal');
const {logger} = require('../configs/winstonLogger/winstonLogger');

async function elasticSearch(req,res){
    const result =  await productDalElastic.getByQuery(req.body.query);
    if (result == null || result == undefined) {
        logger.error(`elasticSearch failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function elasticSearchGetAll(req,res){
    const result =  await productDalElastic.getAll();
    if (result == null || result == undefined) {
        logger.error(`elasticSearchGetAll failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getAllProducts(req, res) {
    const result = await productDal.getAll();
    if (result == null || result == undefined) {
        logger.error(`getAllProducts failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getProductById(req, res) {
    const result = await productDal.getById(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getProductById failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getByCategoryId(req, res) {
    const result = await productDal.getByCategoryId(req.params.id);
    if (result == null || result == undefined) {
        logger.error(`getByCategoryId failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function getByCategoryPath(req, res) {
    const result = await productDal.getByCategoryPath(req.params.path);
    if (result == null || result == undefined) {
        logger.error(`getByCategoryId failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function createProduct(req, res) {
    const result = await productDal.create(req.body);
    if(result != null && result != undefined){
        const esResult = await productDalElastic.create(result);
        return res.status(200).json({...result ,...esResult});
    }
    if (result == null || result == undefined) {
        logger.error(`createProduct failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function updateProduct(req, res) {
    const result = await productDal.updateById(req.body);
    if(result != null){
        const esResult = await productDalElastic.updateById(result);
            return res.status(200).json({...result ,...esResult});

    }
    if (result == null || result == undefined) {
        logger.error(`updateProduct failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

async function deleteProduct(req, res) {
    const result = await productDal.deleteById(req.body);
    if(result != null){
        const esResult = await productDalElastic.deleteById(result);
        return res.status(200).json({...result, ...esResult});
    }
    if (result == null || result == undefined) {
        logger.error(`updateProduct failed.`, { "file": __filename, message: "query error" });
        return res.status(404).json({response:"something went wrong!"})
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: getAllProducts,
    getById: getProductById,
    getByCategoryId:getByCategoryId,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
    elasticSearch:elasticSearch,
    elasticSearchGetAll:elasticSearchGetAll,
    getByCategoryPath:getByCategoryPath,
}