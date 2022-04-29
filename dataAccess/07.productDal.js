const {db} = require('../configs/db/postgre-connection');
const {logger} = require('../configs/winstonLogger/winstonLogger');



async function getAll(){
    let sql = 'SELECT * FROM product'
    let result;
    try {
        result = await db.any(sql);
    } catch (error) {
        logger.error(`getAll failed.`,{"file":__filename,message:error.message});
    }
    return result;
  
}

async function getById(id){
    let sql = 'SELECT * FROM product WHERE id = $1'
    let result;
    try {
        result = await db.oneOrNone(sql,id); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}
async function getByCategoryPath(path){
    let sql = "SELECT * FROM product WHERE category_id in (SELECT id FROM product_category WHERE $1 @> path)"
    let result;
    try {
        result = await db.any(sql,path); 
    } catch (error) {
        logger.error(`getById failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}

async function getByCategoryId(id){
    let sql = 'SELECT * FROM product WHERE category_id = $1'
    let result;
    try {
        result = await db.any(sql,id); 
    } catch (error) {
        logger.error(`getByCategoryId failed.`,{"file":__filename,message:error.message});
    }
    return  result;
}


async function create(body){
    let sql = "INSERT INTO product ( title, descript, category_id, price) VALUES($1, $2, $3, $4) RETURNING *";
    let values = [body.title, body.descript,  body.category_id, body.price];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`create failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function updateById(body){
    let sql = 'UPDATE product SET title=$1, descript=$2, category_id=$3, price = $4, discount_id=$5 WHERE id = $6 RETURNING *';
    let values = [body.title, body.descript, body.category_id, body.price, body.discount_id, body.id];
    let result;
    try {
        result = await db.oneOrNone(sql,values);
    } catch (error) {
        logger.error(`updateById failed.`,{"file":__filename,message:error.message});
    }
    return result;
}

async function deleteById(body){
    let sql = 'DELETE FROM product WHERE id = $1 RETURNING *';
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
    getById,
    updateById,
    deleteById,
    getByCategoryId,
    getByCategoryPath
}