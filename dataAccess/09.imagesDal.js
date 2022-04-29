const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');


async function getAll(){
    let sql = 'SELECT * FROM images'
    let result;
    try {
        result = await db.many(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
  
}

async function getById(id){
    let sql = 'SELECT * FROM images WHERE id = $1;'
    let result;
    try {
        result = await db.oneOrNone(sql,id); 
    } catch (error) {
        result = null;
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}

async function getProductImages(id){
    let sql = 'SELECT * FROM images WHERE product_id = $1;'
    let result;
    try {
        result = await db.manyOrNone(sql,id); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}


async function create(product_id, image_name, byte_data ){
    let sql = "INSERT INTO images(product_id, image_name, byte_data) VALUES($1, $2, $3) RETURNING *";
    let values = [product_id, image_name, byte_data];
    let result;
    try {
        result = await db.oneOrNone(sql, values);
    } catch (error) {
        result = null;
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteById(body){
    let sql = 'DELETE FROM images WHERE id = $1 RETURNING *';
    let result;
    try {
        result = await db.oneOrNone(sql,body.id);
    } catch (error) {
        result = null;
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteProductImages(body){
    let sql = 'DELETE FROM images WHERE product_id = $1 RETURNING *';
    let result;
    try {
        result = await db.oneOrNone(sql,body.id);
    } catch (error) {
        result = null;
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}


module.exports = {
    create,
    getAll,
    getById,
    deleteById,
    getProductImages,
    deleteProductImages
    
}