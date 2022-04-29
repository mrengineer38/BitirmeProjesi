const es =  require('../configs/db/elastic/elastic-service');
const {logger} = require('../configs/winstonLogger/winstonLogger');

async function getAll(){
    let result;
    try {
        result = await es.searchProduct("*");
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function getByQuery(query){
    let result;
    try {
        result = await es.searchProduct(query); 
    } catch (error) {
        logger.error(`getByQuery failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}



async function create(body){
    let result;
    try {
        result = await es.insertProduct(body)
    } catch (error) {
        clogger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateById(body){
    let result;
    try {
        result = await es.updateProductBySelfId(body.id, body)
    } catch (error) {
        logger.error(`updateById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteById(body){
    let result;
    try {
        result = await es.deleteProductById(body.id);
    } catch (error) {
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}


module.exports = {
    create,
    getAll,
    getByQuery,
    updateById,
    deleteById
}