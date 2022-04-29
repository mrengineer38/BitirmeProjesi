const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');



async function getAll(){
    let sql = 'SELECT * FROM product_category WHERE nlevel(path) =1'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function getAllDetailed(){
    let sql = 'SELECT * FROM product_category'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function getByPath(path){
    let sql = 'SELECT * FROM product_category WHERE $1 @> path'
    let result;
    try {
        result = await db.any(sql,path); 
    } catch (error) {
        logger.error(`getByPath failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}


async function create(body){
    let sql = "INSERT INTO product_category(title, descript, path) VALUES($1,$2,$3) RETURNING *";
    let values = [body.title, body.descript, body.path];
    let result;
    try {
        result = await db.oneOrNone(sql, values);
    } catch (error) {
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateById(body){
    let sql = 'UPDATE product_category SET title = $1, descript = $2, path =$3 WHERE id = $4 RETURNING *';
    let values = [body.title, body.descript, body.path, body.id];
    let result;
    try {
        result = await db.any(sql,values);
    } catch (error) {
        logger.error(`updateById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteById(body){
    let sql = 'DELETE FROM product_category WHERE id = $1 RETURNING *';
    let result;
    try {
        result = await db.oneOrNone(sql,body.id);
    } catch (error) {
        logger.error(`deleteById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}


module.exports = {
    create,
    getAll,
    getById: getByPath,
    updateById,
    deleteById,
    getAllDetailed,
}